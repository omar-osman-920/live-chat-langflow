import axios from "axios";

// Define a response type that matches the expected structure
interface FlowResponse {
    data: {
        outputs?: Array<{
            outputs: {
                [key: string]: {
                    type: string;
                    value: string;
                }
            }
        }>;
        session_id?: string;
    };
}

export async function sendMessage(
    baseUrl: string, 
    flowId: string, 
    message: string,
    input_type: string,
    output_type: string,
    sessionId: React.MutableRefObject<string>,
    output_component?: string, 
    tweaks?: Object,
    api_key?: string,
    additional_headers?: {[key: string]: string},
    streaming?: boolean,
    onStreamUpdate?: (chunk: string) => void
): Promise<FlowResponse> {
    let data: any = {
        input_type, 
        input_value: message, 
        output_type
    };
    
    if (tweaks) {
        data["tweaks"] = tweaks;
    }
    
    if (output_component) {
        data["output_component"] = output_component;
    }
    
    let headers: {[key: string]: string} = {"Content-Type": "application/json"};
    
    if (api_key) {
        headers["x-api-key"] = api_key;
    }
    
    if (additional_headers) {
        headers = Object.assign(headers, additional_headers);
    }
    
    if (sessionId.current && sessionId.current !== "") {
        data.session_id = sessionId.current;
    }
    
    // Add streaming flag to request if needed
    if (streaming === true) {
        data.stream = true;
        
        return new Promise<FlowResponse>((resolve, reject) => {
            // Use fetch API for streaming
            fetch(`${baseUrl}/api/v1/run/${flowId}/stream`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // Set up variables for accumulating the full response
                let fullResponse = "";
                const responseObj: FlowResponse = { 
                    data: {
                        outputs: [{
                            outputs: {
                                text: {
                                    type: "text",
                                    value: ""
                                }
                            }
                        }]
                    } 
                };
                
                // Create a reader for the response stream
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                
                if (!reader) {
                    throw new Error('Stream reader could not be created');
                }
                
                // Function to recursively read stream chunks
                function processStream({ done, value }: ReadableStreamReadResult<Uint8Array>) {
                    if (done) {
                        // End of stream, resolve with the complete response
                        if (responseObj.data.outputs && responseObj.data.outputs.length > 0) {
                            if (responseObj.data.outputs[0].outputs.text) {
                                responseObj.data.outputs[0].outputs.text.value = fullResponse;
                            }
                        }
                        resolve(responseObj);
                        return;
                    }
                    
                    // Decode the chunk
                    const chunk = decoder.decode(value, { stream: true });
                    
                    // Parse each SSE line (data: {...})
                    const lines = chunk.split('\n\n');
                    lines.forEach(line => {
                        if (line.startsWith('data: ')) {
                            try {
                                const jsonData = JSON.parse(line.substring(6));
                                
                                // Handle text chunks
                                if (jsonData.text) {
                                    fullResponse += jsonData.text;
                                    
                                    // Call the update callback with new chunk
                                    if (onStreamUpdate) {
                                        onStreamUpdate(jsonData.text);
                                    }
                                }
                                
                                // Store session_id if available
                                if (jsonData.session_id) {
                                    responseObj.data.session_id = jsonData.session_id;
                                }
                                
                                // Check for stream end
                                if (jsonData.end_stream === true) {
                                    if (responseObj.data.outputs && responseObj.data.outputs.length > 0) {
                                        if (responseObj.data.outputs[0].outputs.text) {
                                            responseObj.data.outputs[0].outputs.text.value = fullResponse;
                                        }
                                    }
                                    resolve(responseObj);
                                    return;
                                }
                            } catch (error) {
                                console.error('Error parsing SSE message:', error);
                            }
                        }
                    });
                    
                    // Continue reading the stream - with null check
                    if (reader) {
                        reader.read().then(processStream).catch(reject);
                    }
                }
                
                // Start reading the stream - with null check
                if (reader) {
                    reader.read().then(processStream).catch(reject);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    } else {
        // Use regular HTTP request for non-streaming
        return axios.post<any>(`${baseUrl}/api/v1/run/${flowId}`, data, {headers})
            .then(response => {
                // Convert Axios response to our FlowResponse type
                return {
                    data: {
                        outputs: response.data.outputs,
                        session_id: response.data.session_id
                    }
                };
            });
    }
}
# Langflow Embedded Chat ⛓️

Welcome to the Langflow Embedded Chat repository! 🎉

The Langflow Embedded Chat is a powerful web component that enables seamless communication with the [Langflow ⛓️](https://github.com/logspace-ai/langflow). This widget provides a chat interface, allowing you to integrate Langflow ⛓️ into your web applications effortlessly.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## What is Langflow?

Langflow is a no-code open-source project that empowers developers to build cutting-edge applications using Language Model technologies. With Langflow, you can leverage the power of LLMs (Large Language Models) to enhance user interactions, generate human-like text, and gain valuable insights from natural language data.

## Features

🌟 Seamless Integration: Easily integrate the Langflow Widget into your website or web application with just a few lines of JavaScript.

🚀 Interactive Chat Interface: Engage your users with a user-friendly chat interface, powered by Langflow's advanced language understanding capabilities.

🎛️ Customizable Styling: Customize the appearance of the chat widget to match your application's design and branding.

🌐 Multilingual Support: Communicate with users in multiple languages, opening up your application to a global audience.

## Installation

### Option 1: CDN Link

Use the Langflow Widget directly from the CDN by including the following script tag in your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js"></script>
```

### Option 2: Local Build

1. Clone this repository to your local machine:

```bash
git clone https://github.com/logspace-ai/langflow-embedded-chat.git
```

2. Navigate to the project directory:

```bash
cd langflow-embedded-chat
```

3. Build the project to generate the bundle:

```bash
npm run build
```

5. After the build process completes, you'll find the bundle in the `dist/build/static/js` folder. You can include this JavaScript file in your HTML:

```html
<script src="path/to/your/langflow-widget.js"></script>
```

## Usage

### on simple HTML
```html
<html lang="en">
<head>
<script src="https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js"></script>
</head>
<body>
<langflow-chat
    host_url="langflow url"
    flow_id="your_flow_id"
  ></langflow-chat>
</body>
</html>
```

### on React
 Import the js bundle in the index.html of your react project
```html
<script src="https://cdn.jsdelivr.net/gh/logspace-ai/langflow-embedded-chat@v1.0.7/dist/build/static/js/bundle.min.js"></script>
```
Encapsulate your custom element in a react component
```html
export default function ChatWidget() {
  return (
    <div>
<langflow-chat
    host_url="langflow url"
    flow_id="your_flow_id"></langflow-chat>
    </div>
  );
}
```

## Configuration

Use the widget API to customize your widget:

| Prop                  | Type      | Required |
|-----------------------|-----------|----------|
| api_key               | string    | Yes      |
| flow_id               | string    | Yes      |
| host_url              | string    | Yes      |
| bot_message_style     | json      | No       |
| chat_position         | string    | No       |
| chat_trigger_style    | json      | No       |
| chat_window_style     | json      | No       |
| output_type           | string    | No       |
| input_type            | string    | No       |
| output_component      | string    | No       |
| error_message_style   | json      | No       |
| height                | number    | No       |
| input_container_style | json      | No       |
| input_style           | json      | No       |
| max_height            | number    | No       |
| max_width             | number    | No       |
| min_height            | number    | No       |
| min_width             | number    | No       |
| online                | boolean   | No       |
| resizable             | boolean   | No       |
| start_open            | boolean   | No       |
| online_message        | string    | No       |
| placeholder           | string    | No       |
| placeholder_sending   | string    | No       |
| send_button_style     | json      | No       |
| send_icon_style       | json      | No       |
| tweaks                | json      | No       |
| user_message_style    | json      | No       |
| width                 | number    | No       |
| window_title          | string    | No       |
| session_id            | string    | No       |
| additional_headers    | json      | No       |

**api_key:**
- Type: String
- Required: Yes
- Description: X-API-Key header to send to Langflow
- Example: "sk-1234567890abcdef"

**bot_message_style:**
- Type: JSON
- Required: No
- Description: Styling options for formatting bot messages in the chat window.
- Example: `{ "color": "#333", "backgroundColor": "#f0f0f0" }`

**input_type:**
- Type: String
- Required: No
- Description: Specifies the input type for chat messages.
- Example: "text"

**output_type:**
- Type: String
- Required: No
- Description: Specifies the output type for chat messages.
- Example: "text"

**output_component:**
- Type: String
- Required: No
- Description: Specify the output ID for chat messages; this is necessary when multiple outputs are present.
- Example: "output_1"

**chat_position:**
- Type: String
- Required: No
- Description: Determines the position of the chat window (top-left, top-center, top-right, center-left, center-right, bottom-right, bottom-center, bottom-left).
- Example: "bottom-right"

**chat_trigger_style:**
- Type: JSON
- Required: No
- Description: Styling options for the chat trigger.
- Example: `{ "backgroundColor": "#007bff", "color": "#fff" }`

**chat_window_style:**
- Type: JSON
- Required: No
- Description: Styling options for the overall chat window.
- Example: `{ "borderRadius": "8px", "boxShadow": "0 2px 8px rgba(0,0,0,0.1)" }`

**error_message_style:**
- Type: JSON
- Required: No
- Description: Styling options for error messages in the chat window.
- Example: `{ "color": "#ff0000", "fontWeight": "bold" }`

**flow_id:**
- Type: String
- Required: Yes
- Description: Identifier for the flow associated with the component.
- Example: "123e4567-e89b-12d3-a456-426614174000"

**height:**
- Type: Number
- Required: No
- Description: Specifies the height of the chat window in pixels.
- Example: 500

**host_url:**
- Type: String
- Required: Yes
- Description: The URL of the host for communication with the chat component.
- Example: "https://my-langflow-instance.com"

**input_container_style:**
- Type: JSON
- Required: No
- Description: Styling options for the input container where chat messages are typed.
- Example: `{ "padding": "10px", "backgroundColor": "#fafafa" }`

**input_style:**
- Type: JSON
- Required: No
- Description: Styling options for the chat input field.
- Example: `{ "border": "1px solid #ccc", "borderRadius": "4px" }`

**online:**
- Type: Boolean
- Required: No
- Description: Indicates if the chat component is online or offline.
- Example: true

**start_open:**
- Type: Boolean
- Required: No
- Description: Indicates if the chat window should be open by default.
- Example: false

**online_message:**
- Type: String
- Required: No
- Description: Custom message to display when the chat component is online.
- Example: "Chat is online!"

**placeholder:**
- Type: String
- Required: No
- Description: Placeholder text for the chat input field.
- Example: "Type your message..."

**placeholder_sending:**
- Type: String
- Required: No
- Description: Placeholder text to display while a message is being sent.
- Example: "Sending..."

**send_button_style:**
- Type: JSON
- Required: No
- Description: Styling options for the send button in the chat window.
- Example: `{ "backgroundColor": "#28a745", "color": "#fff" }`

**send_icon_style:**
- Type: JSON
- Required: No
- Description: Styling options for the send icon in the chat window.
- Example: `{ "fontSize": "18px" }`

**tweaks:**
- Type: JSON
- Required: No
- Description: Additional custom tweaks for the associated flow.
- Example: `{ "api_key": "sk-xxxx", "temperature": 0.7 }`

**user_message_style:**
- Type: JSON
- Required: No
- Description: Styling options for formatting user messages in the chat window.
- Example: `{ "color": "#222", "backgroundColor": "#e0ffe0" }`

**resizable:**
- Type: Boolean
- Required: No
- Default: false
- Description: Enables or disables the ability to resize the chat window.
- Example: true

**min_width:**
- Type: Number
- Required: No
- Default: 300
- Description: Specifies the minimum width in pixels when resizing the chat window.
- Example: 300

**min_height:**
- Type: Number
- Required: No
- Default: 400
- Description: Specifies the minimum height in pixels when resizing the chat window.
- Example: 400

**max_width:**
- Type: Number
- Required: No
- Default: 2000
- Description: Specifies the maximum width in pixels when resizing the chat window.
- Example: 800

**max_height:**
- Type: Number
- Required: No
- Default: 2000
- Description: Specifies the maximum height in pixels when resizing the chat window.
- Example: 1000

**width:**
- Type: Number
- Required: No
- Description: Specifies the width of the chat window in pixels.
- Example: 350

**window_title:**
- Type: String
- Required: No
- Description: Title for the chat window, displayed in the header or title bar.
- Example: "Support Chat"

**session_id:**
- Type: String
- Required: No
- Description: Custom session id to override the random session id used as default.
- Example: "user-session-001"

**additional_headers:**
- Type: JSON
- Required: No
- Description: Additional headers to be sent to Langflow server
- Example: `{ "X-Custom-Header": "value" }`

## Contributing
Contributions are welcome! Please follow the details below on how to get started.
1. Fork the repository and clone it to your local machine.
2. Install the dependencies:
   ```bash
   npm install
   (or)
   npm install --legacy-peer-deps
   ```
3. Make your changes and ensure everything is working as expected:
   ```bash
   npm run build
   npm start
   ```
4. Run the tests to ensure nothing is broken:
   ```bash
   npm test
   ```
5. Commit your changes and push them to your forked repository.
6. Open a pull request to the main repository.

## Live example
Try out or [live example](https://codesandbox.io/s/langflow-embedded-chat-example-dv9zpx) to see how the Langflow Embedded Chat ⛓️ works. 

1. First create a Flow and save it using [Langflow ⛓️](https://github.com/logspace-ai/langflow).
2. Get the hosted URL to use in the live example.
3. If you are using a public host (like [Hugging Face Spaces](https://huggingface.co/spaces/Logspace/Langflow)) use tweaks to keep your API keys safe.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](https://github.com/logspace-ai/langflow-embedded-chat/tree/main/LICENSE) file for details.

## ❤️ Contributors

[![langflow contributors](https://contrib.rocks/image?repo=langflow-ai/langflow-embedded-chat)](https://github.com/langflow-ai/langflow-embedded-chat/graphs/contributors)

---
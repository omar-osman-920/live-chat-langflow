# Resizable Chat Widget Feature

This document provides information on how to use the resizable chat widget feature in the Langflow Embedded Chat component.

## Overview

The resizable chat widget allows users to dynamically adjust the dimensions of the chat window according to their preferences. This feature enhances user experience by providing flexibility in sizing the chat interface.

## Usage

To enable the resizable chat widget, use the following attributes when embedding the chat widget:

```html
<langflow-chat 
  window_title="Resizable Chat" 
  flow_id="your-flow-id"
  host_url="your-host-url"
  width="500"
  height="600"
  resizable="true"
  min_width="300"
  min_height="400"
  max_width="800"
  max_height="900"
></langflow-chat>
```

## Configuration Options

### Required Properties

- `resizable` (boolean): Set to "true" to enable the resize functionality. Default is "false".

### Optional Properties

- `min_width` (number): Minimum width in pixels the chat window can be resized to. Default is 300.
- `min_height` (number): Minimum height in pixels the chat window can be resized to. Default is 400.
- `max_width` (number): Maximum width in pixels the chat window can be resized to. Default is 2000.
- `max_height` (number): Maximum height in pixels the chat window can be resized to. Default is 2000.

## How to Resize

When the resizable feature is enabled, a resize handle appears in the bottom-right corner of the chat window. Users can:

1. Click and hold the resize handle
2. Drag the handle to adjust the size
3. Release to set the new dimensions

The chat window will respect the minimum and maximum size constraints specified in the configuration.

## Example Implementation

Here's a complete example implementation with the resizable feature:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Langflow Chat - Resizable Demo</title>
</head>
<body>
    <h1>Resizable Chat Widget Demo</h1>
    
    <langflow-chat 
        window_title="Resizable Chat Widget" 
        flow_id="your-flow-id"
        host_url="your-host-url"
        width="500"
        height="600"
        resizable="true"
        min_width="300"
        min_height="400"
        max_width="800"
        max_height="900"
    ></langflow-chat>
    
    <script src="path/to/langflow-chat.js"></script>
</body>
</html>
```

## Browser Compatibility

The resizable feature is supported in all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Troubleshooting

If the resize functionality is not working as expected:

1. Ensure the `resizable` attribute is set to "true"
2. Check that the min/max values are reasonable (min < max)
3. Verify that there are no CSS conflicts affecting the chat window

## Technical Implementation

The resize functionality is implemented using JavaScript event listeners for mouse events. When a resize operation starts:

1. The initial mouse position and chat dimensions are recorded
2. Mouse movement is tracked to calculate new dimensions
3. Size constraints are applied to ensure the window stays within min/max boundaries
4. The window dimensions are updated in real-time

This approach provides a smooth and responsive resize experience.
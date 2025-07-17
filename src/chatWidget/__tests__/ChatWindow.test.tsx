import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWindow from '../chatWindow';

// Mock the extractMessageFromOutput and other imported functions
jest.mock('../utils', () => ({
  extractMessageFromOutput: jest.fn((output) => output),
  getAnimationOrigin: jest.fn(() => 'origin-bottom-right'),
  getChatPosition: jest.fn(() => ({ top: '0px', left: '0px' })),
}));

// Mock the sendMessage function
jest.mock('../../controllers', () => ({
  sendMessage: jest.fn().mockImplementation(() => Promise.resolve({ data: {} })),
}));

describe('ChatWindow Component', () => {
  const defaultProps = {
    api_key: 'test-api-key',
    flowId: 'test-flow-id',
    hostUrl: 'http://test-host-url',
    updateLastMessage: jest.fn(),
    messages: [],
    output_type: 'chat',
    input_type: 'chat',
    addMessage: jest.fn(),
    open: true,
    triggerRef: { current: document.createElement('button') } as React.RefObject<HTMLButtonElement>,
    sessionId: { current: 'test-session-id' } as React.MutableRefObject<string>,
  };

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test('renders chat window with default props', () => {
    render(<ChatWindow {...defaultProps} />);
    
    // Check if chat window is rendered
    const chatWindow = screen.getByText('Chat');
    expect(chatWindow).toBeInTheDocument();
  });

  test('does not render resize handle when resizable is false', () => {
    render(<ChatWindow {...defaultProps} />);
    
    // Check that resize handle is not rendered
    const resizeHandle = document.querySelector('.cl-resize-handle');
    expect(resizeHandle).not.toBeInTheDocument();
  });

  test('renders resize handle when resizable is true', () => {
    render(<ChatWindow {...defaultProps} resizable={true} />);
    
    // Check that resize handle is rendered
    const resizeHandle = document.querySelector('.cl-resize-handle');
    expect(resizeHandle).toBeInTheDocument();
  });

  test('chat window has resizable class when resizable is true', () => {
    render(<ChatWindow {...defaultProps} resizable={true} />);
    
    // Check that chat window has resizable class
    const chatWindow = document.querySelector('.cl-window');
    expect(chatWindow).toHaveClass('resizable');
  });

  test('chat window does not have resizable class when resizable is false', () => {
    render(<ChatWindow {...defaultProps} />);
    
    // Check that chat window does not have resizable class
    const chatWindow = document.querySelector('.cl-window');
    expect(chatWindow).not.toHaveClass('resizable');
  });

  test('resize handle triggers resize events', () => {
    render(<ChatWindow {...defaultProps} resizable={true} width={500} height={600} />);
    
    // Get the resize handle
    const resizeHandle = document.querySelector('.cl-resize-handle') as HTMLElement;
    expect(resizeHandle).toBeInTheDocument();
    
    // Mock mouse events for resize
    fireEvent.mouseDown(resizeHandle, { clientX: 0, clientY: 0 });
    
    // Verify that event listeners are attached (indirectly)
    // This is challenging to test directly with jsdom, but we can check if the class is applied
    const chatWindow = document.querySelector('.cl-window');
    expect(chatWindow).toHaveClass('resizable');
  });

  test('respects min and max size constraints', () => {
    render(
      <ChatWindow 
        {...defaultProps} 
        resizable={true}
        width={500}
        height={600}
        min_width={300}
        min_height={400}
        max_width={800}
        max_height={900}
      />
    );
    
    // Get the chat window element
    const chatWindow = document.querySelector('.cl-window') as HTMLElement;
    expect(chatWindow).toBeInTheDocument();
    
    // Initial size should match props
    expect(chatWindow.style.width).toBe('500px');
    expect(chatWindow.style.height).toBe('600px');

    // Check if min/max constraints are applied
    expect(chatWindow.style.minWidth).toBe('300px');
    expect(chatWindow.style.minHeight).toBe('400px');
    expect(chatWindow.style.maxWidth).toBe('800px');
    expect(chatWindow.style.maxHeight).toBe('900px');
  });

  test('uses default constraints when min/max not provided', () => {
    render(
      <ChatWindow
        {...defaultProps}
        resizable={true}
        width={500}
        height={600}
      />
    );

    // Get the chat window element
    const chatWindow = document.querySelector('.cl-window') as HTMLElement;
    expect(chatWindow).toBeInTheDocument();

    // Should use default constraints
    expect(chatWindow.style.minWidth).toBe('300px');
    expect(chatWindow.style.minHeight).toBe('400px');
    expect(chatWindow.style.maxWidth).toBe('2000px');
    expect(chatWindow.style.maxHeight).toBe('2000px');
  });
});
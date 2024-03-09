import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';
import { useState } from 'react';

const initialMessages = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    sender: "support",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    text: "I need help with my chair repair booking",
    sender: "user",
    timestamp: "10:31 AM"
  },
  {
    id: 3,
    text: "I'll be happy to help you with that. Could you please provide your booking reference number?",
    sender: "support",
    timestamp: "10:32 AM"
  }
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Support Chat</Text>
        <Text style={styles.subtitle}>We're here to help</Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.sender === 'user' ? styles.userMessage : styles.supportMessage
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userBubble : styles.supportBubble
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 24,
    backgroundColor: '#4A90E2',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E1E1E1',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  supportMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  supportBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
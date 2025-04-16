import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import editTaskStyles from '../styles/editTaskStyles';

// Define the props type for this component
type Props = {
  visible: boolean;
  initialTitle: string;
  initialAbout: string;
  onCancel: () => void;
  onSave: (title: string, about: string) => void;
};

const EditTaskPopup: React.FC<Props> = ({
  visible,
  initialTitle,
  initialAbout,
  onCancel,
  onSave,
}) => {
  // Local state for title and about (the task's title and description)
  const [title, setTitle] = useState(initialTitle);
  const [about, setAbout] = useState(initialAbout);

  // When the component receives new props, update the state
  useEffect(() => {
    setTitle(initialTitle);
    setAbout(initialAbout);
  }, [initialTitle, initialAbout, visible]);

  // If the popup isn't visible, return null and render nothing
  if (!visible) return null;

  return (
    <View style={editTaskStyles.container}>
      {/* Title input field */}
      <TextInput
        style={editTaskStyles.input}
        placeholder="Title"
        placeholderTextColor="#A66CFF"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description input field */}
      <TextInput
        style={[editTaskStyles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Description..."
        placeholderTextColor="#A66CFF"
        multiline
        value={about}
        onChangeText={setAbout}
      />

      {/* Buttons for Cancel and Save */}
      <View style={editTaskStyles.buttonsContainer}>
        <TouchableOpacity onPress={onCancel} style={editTaskStyles.button}>
          <Text style={editTaskStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSave(title, about)}
          style={editTaskStyles.button}
        >
          <Text style={editTaskStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTaskPopup;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import editTaskStyles from '../styles/editTaskStyles';

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

  const [title, setTitle] = useState(initialTitle);
  const [about, setAbout] = useState(initialAbout);

 
  useEffect(() => {
    setTitle(initialTitle);
    setAbout(initialAbout);
  }, [initialTitle, initialAbout, visible]);

  
  if (!visible) return null;

  return (
    <View style={editTaskStyles.container}>
   
      <TextInput
        style={editTaskStyles.input}
        placeholder="Title"
        placeholderTextColor="#A66CFF"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[editTaskStyles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Description..."
        placeholderTextColor="#A66CFF"
        multiline
        value={about}
        onChangeText={setAbout}
      />

   
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

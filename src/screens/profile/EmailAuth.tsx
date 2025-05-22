import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import Zocial from "@expo/vector-icons/Zocial";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function EmailAuth() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    else if (!data.session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  const handleClose = () => {
    setShowModal(false);
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    <>
      <Button
        onPress={() => setShowModal(true)}
        title="Logga in med e-post"
        icon={<Zocial name="email" size={24} />}
      />
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={handleClose}>
        <View style={styles.container}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            Logga in med e-post
          </Text>
          <Input
            label="E-postadress"
            leftIcon={<FontAwesome5 name="envelope" size={24} />}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />

          <Input
            label="Lösenord"
            leftIcon={<FontAwesome5 name="lock" size={24} />}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Lösenord"
            autoCapitalize={"none"}
          />

          <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
          <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 8,
  },
});

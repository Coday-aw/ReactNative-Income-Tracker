import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "errors" in err &&
        Array.isArray((err as any).errors) &&
        (err as any).errors[0]?.code === "form_param_nil"
      ) {
        console.error("Email and password are required");
      } else {
        console.error(err);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4 gap-5 bg-slate-50">
      <Ionicons name="lock-closed" size={90} color={"#203141"} />
      <Text className="text-5xl font-bold text-slate-800">Login</Text>
      <TextInput
        className="w-[80%] border border-slate-300 rounded-2xl px-3 py-3 text-xl"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        className="w-[80%] border border-slate-300 rounded-2xl px-3 py-3 text-xl"
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity
        className="bg-slate-800 rounded-2xl px-3 py-5 w-[80%] items-center"
        onPress={onSignInPress}
      >
        <Text className="text-white font-bold text-xl">Sign in</Text>
      </TouchableOpacity>
      <View className="flex-row gap-2">
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text className="font-bold">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

// tailwind what color is this #203141

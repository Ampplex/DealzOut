import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import storage from "@react-native-firebase/storage";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import UploadImgUri_Context from "../context/UploadImgUri/UploadImgUri_Context";

const UploadFile = async (imgUri: string ): Promise<void> => {
  const [transferred, setTransferred] = useState<Float>(0);
  const { uploadUri, loadingIndicator, setUploadUri, setLoadingIndicator } =
    useContext<any>(UploadImgUri_Context);

  
/* 
  uploadUri - Url of the uploaded file
  loadingIndicator - Loading Indicator Function to let the user know that the file is being uploaded
  transferred - It shows the number of bytes that has been uploaded
  */
  useEffect(() => {
    console.log("Hello",imgUri)
  })

  if (imgUri == null) {
    return null;
  }

  const upload_uri: string | null | void = imgUri;
  let filename = upload_uri.substring(upload_uri.lastIndexOf("/") + 1);

  // Add timestamp to File Name
  const extension = filename.split(".").pop();
  const name = filename.split(".").slice(0, -1).join(".");
  filename = name + Date.now() + "." + extension;

  setLoadingIndicator(true);
  setTransferred(0);

  const storageRef = storage().ref(`photos/${filename}`);
  const task = storageRef.putFile(upload_uri);

  // Set transferred state
  task.on("state_changed", (taskSnapshot) => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
    );

    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    );
  });

  try {
    await task;

    const url: string = await storageRef.getDownloadURL();

    setLoadingIndicator(false);

    setUploadUri(url);
  } catch (e) {
    // Fails to get image url
    console.log(e);
    return null;
  }
};

export default UploadFile;

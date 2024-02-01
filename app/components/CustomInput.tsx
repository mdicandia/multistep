"use client";
import * as React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";
import edit from "@/assets/edit.svg";
import styles from "./tab.module.css";
import Image from "next/image";
import { useWatch } from "react-hook-form";

export const CustomInput = ({
  id,
  label,
  register,
  placeholder,
  control,
  errors,
  type,
}: {
  id: string;
  label: string;
  placeholder: string;
  register: any;
  errors: any;
  control: any;
  type: string;
}) => {
  const value = useWatch({
    name: id,
    control: control,
  });
  const [isEditEnabled, setIsEditEnabled] = React.useState(false);

  const handleOnClick = () => {
    setIsEditEnabled(!isEditEnabled);
  };

  return (
    <div className={styles.input}>
      <FormLabel htmlFor={id} sx={{ fontSize: "10px", color: "#808080" }}>
        {label}
      </FormLabel>
      {isEditEnabled ? (
        <FormControl isInvalid={Boolean(errors[id]) ?? false}>
          <Input
            id={id}
            placeholder={placeholder}
            sx={{ height: "24px" }}
            size="xs"
            type={type}
            {...register(id, {
              required: "This is required",
            })}
          />
        </FormControl>
      ) : (
        <div className={styles.inputValue}> {value} </div>
      )}
      <Image
        onClick={() => handleOnClick()}
        src={edit}
        alt="edit"
        width={15}
        height={15}
        className={styles.edit}
      />
    </div>
  );
};

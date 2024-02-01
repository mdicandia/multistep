"use client";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import styles from "./tab.module.css";
import { CustomInput } from "./CustomInput";
import "react-datepicker/dist/react-datepicker.css";

type Fields = {
  unitType: string;
  unit: string;
  moveInDate: string;
  deposit: string;
  rent: string;
  prepayment: string;
  promocode: string;
  products: string;
};

export const Form = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Fields>();

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // alert('chubaca');
        resolve(values);
      }, 3000);
    });
  }
  return (
    <>
      <h1 className={styles.formHeader}>Order Summary</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.sharedRow}>
          <div className={styles.select}>
            <FormControl isInvalid={Boolean(errors.unitType) ?? false}>
              <FormLabel
                htmlFor="unitType"
                sx={{ fontSize: "10px", color: "#808080" }}
              >
                Unit Type
              </FormLabel>
              <Select
                id="unitType"
                placeholder="Select unit type"
                {...register("unitType", {
                  required: "This is required",
                })}
                sx={{ height: "24px" }}
                size="xs"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              {/* <FormErrorMessage> */}
              {/* {errors.unitType && String(errors.unitType.message ?? '')} */}
              {/* </FormErrorMessage> */}
            </FormControl>
          </div>
          <CustomInput
            id="unit"
            label="Unit"
            placeholder="Select unit"
            control={control}
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.dateInput}>
            <FormControl isInvalid={Boolean(errors.moveInDate) ?? false}>
              <FormLabel
                htmlFor="moveInDate"
                sx={{ fontSize: "10px", color: "#808080" }}
              >
                Move-in Date
              </FormLabel>
              <Controller
                control={control}
                name="moveInDate"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value ? new Date(field.value) : new Date()}
                    className={styles.datePicker}
                  />
                )}
              />
              <FormErrorMessage>
                {/* {errors.moveInDate && String(errors.moveInDate.message)} */}
              </FormErrorMessage>
            </FormControl>
          </div>
        </div>
        <div className={styles.sharedRow}>
          <CustomInput
            id="deposit"
            label="Deposit"
            placeholder="Select deposit"
            control={control}
            register={register}
            errors={errors}
            type="number"
          />

          <CustomInput
            id="rent"
            label="Rent"
            placeholder="Select rent"
            control={control}
            register={register}
            errors={errors}
            type="number"
          />
        </div>
        <div className={styles.row}>
          <CustomInput
            id="prepayment"
            label="Prepayment"
            placeholder="Select prepayment"
            control={control}
            register={register}
            errors={errors}
            type="number"
          />
        </div>
        <div className={styles.row}>
          <CustomInput
            id="promocode"
            label="Promocode"
            placeholder="Select promocode"
            control={control}
            register={register}
            errors={errors}
            type="text"
          />
        </div>
        <div className={styles.row}>
          <CustomInput
            id="products"
            label="Products"
            placeholder="Select products"
            control={control}
            register={register}
            errors={errors}
            type="text"
          />
        </div>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

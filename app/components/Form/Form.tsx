"use client";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormLabel, FormControl, Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import styles from "./form.module.css";
import { CustomInput } from "../CustomInput/CustomInput";
import "react-datepicker/dist/react-datepicker.css";
import useSWR from "swr";

type Unit = {
  id: string;
  label: string;
};

type UnitOptions = Unit[];

const fetcher = (...args: Parameters<typeof fetch>): Promise<UnitOptions> =>
  fetch(...args).then((res) => res.json());

export const Form = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { data: unitOptions } = useSWR<UnitOptions, any>("/api/units", fetcher);

  return (
    <>
      <h1 className={styles.formHeader}>Order Summary</h1>
      <form>
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
                {unitOptions?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <CustomInput
            id="unit"
            label="Unit"
            placeholder="Type unit"
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
                    placeholderText="Pick date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value ? new Date(field.value) : new Date()}
                    className={styles.datePicker}
                  />
                )}
              />
            </FormControl>
          </div>
        </div>
        <div className={styles.sharedRow}>
          <CustomInput
            id="deposit"
            label="Deposit"
            placeholder="Type deposit"
            control={control}
            register={register}
            errors={errors}
            type="number"
          />

          <CustomInput
            id="rent"
            label="Rent"
            placeholder="Type rent"
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
            placeholder="Type prepayment"
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
            placeholder="Type promocode"
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
            placeholder="Type products"
            control={control}
            register={register}
            errors={errors}
            type="text"
          />
        </div>
      </form>
    </>
  );
};

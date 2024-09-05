"use client";

import {
  getLocalTimeZone,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import { Button, ButtonGroup, DatePicker } from "@nextui-org/react";
import { useLocale } from "@react-aria/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

export const CustomDatePicker = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultDate = today(getLocalTimeZone());

  const [value, setValue] = React.useState(defaultDate);

  const { locale } = useLocale();

  const now = today(getLocalTimeZone());
  const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
  const nextMonth = startOfMonth(now.add({ months: 1 }));

  const applyDateFilter = useCallback(
    (date: any) => {
      const params = new URLSearchParams(searchParams.toString());
      if (date) {
        params.set("filter[updated_at__lte]", date.toString());
      } else {
        params.delete("filter[updated_at__lte]");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleDateChange = (newValue: any) => {
    setValue(newValue);
    applyDateFilter(newValue);
  };

  return (
    <div className="flex flex-col md:gap-2 w-full">
      <DatePicker
        CalendarBottomContent={<div className="min-w-[380px]"></div>}
        CalendarTopContent={
          <ButtonGroup
            fullWidth
            className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button onPress={() => handleDateChange(now)}>Today</Button>
            <Button onPress={() => handleDateChange(nextWeek)}>
              Next week
            </Button>
            <Button onPress={() => handleDateChange(nextMonth)}>
              Next month
            </Button>
          </ButtonGroup>
        }
        calendarProps={{
          focusedValue: value,
          onFocusChange: setValue,
          nextButtonProps: {
            variant: "bordered",
          },
          prevButtonProps: {
            variant: "bordered",
          },
        }}
        value={value}
        onChange={handleDateChange}
        label="Scan date"
        size="sm"
        variant="flat"
      />
    </div>
  );
};

<script>
  import Day from "./Day.svelte";
  import "../holidays.css";
  import { year, data as holiday_data } from "../../holiday_data/data.json";

  export let monthNumber; // 1 for January, 2 for February, etc.
  let weeks = [];
  let monthName = "";

  function get_holiday_type(day) {
    const cur_date = new Date(year, monthNumber - 1, day);
    cur_date.setHours(0, 0, 0, 0); // Normalize to midnight

    // Check if cur_date falls within any holiday range
    const isHoliday = holiday_data.some((holiday) => {
      const start = new Date(holiday.start);
      const end = new Date(holiday.end);
      start.setHours(0, 0, 0, 0); // Normalize to midnight
      end.setHours(0, 0, 0, 0); // Normalize to midnight

      return cur_date >= start && cur_date <= end;
    });

    if (isHoliday) {
      console.log(cur_date);
      return 2;
    }

    // Check if cur_date is Saturday (6) or Sunday (0)
    const day_of_week = cur_date.getDay();
    if (day_of_week === 6 || day_of_week === 0) {
      return 1;
    }

    return 0;
  }

  $: if (monthNumber >= 1 && monthNumber <= 12) {
    // Adjust the monthNumber to be 0-indexed for JavaScript Date (January is 0)
    const date = new Date(year, monthNumber - 1, 1);
    monthName = date.toLocaleString("default", { month: "long" });

    const daysInMonth = new Date(year, monthNumber, 0).getDate();
    const startDay = new Date(year, monthNumber - 1, 1).getDay();

    weeks = []; // Reset weeks before recalculating
    let currentWeek = Array(startDay).fill({ day: null, holiday_type: null }); // Fill the first week with empty cells

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push({ day, holiday_type: get_holiday_type(day) });
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      } else if (day === daysInMonth) {
        weeks.push([
          ...currentWeek,
          ...Array(7 - currentWeek.length).fill({ day: null, holiday_type: null })
        ]);
        currentWeek = [];
        break;
      }
    }

    // Add remaining empty cells to complete the last week
    if (currentWeek.length > 0) {
      weeks.push([
        ...currentWeek,
        ...Array(7 - currentWeek.length).fill({ day: null, holiday_type: null })
      ]);
    }
  }
</script>

<div class="flex flex-col items-center p-4 h-full w-full title">
  <div class="flex flex-row items-center mb-4 w-full justify-between">
    <h2 class="text-xl font-bold">{monthName} - {monthNumber}/{year}</h2>
    <div class="flex flex-row items-center">
      <span class="weekends circle"></span>
      <span class="ml-1">= วันหยุดสุดสัปดาห์</span>
      <span class="px-2">,</span>
      <span class="specials circle"></span>
      <span class="ml-1">= วันหยุดราชการ</span>
    </div>
  </div>

  <table class="table-fixed border-collapse w-full h-full border border-black">
    <thead>
      <tr class="header">
        <th class="p-2 text-center border border-black w-1/7 h-full">อาทิตย์</th>
        <th class="p-2 text-center border border-black w-1/7 h-full">จันทร์</th>
        <th class="p-2 text-center border border-black w-1/7 h-full">อังคาร</th>
        <th class="p-2 text-center border border-black w-1/7 h-full">พุธ</th>
        <th class="p-2 text-center border border-black w-1/7 h-full">พฤหัสบดี</th>
        <th class="p-2 text-center border border-black w-1/7 h-full">ศุกร์</th>
        <th class="p-2 text-center border border-black w-1/7 h-full">เสาร์</th>
      </tr>
    </thead>
    <tbody>
      {#each weeks as week}
        <tr class={weeks.length === 5 ? "day-5" : "day-6"}>
          {#each week as { day, holiday_type }}
            <td class="p-0.5 text-center border border-black w-1/7 h-full">
              {#if day !== null}
                <Day dayNumber={day} holidayType={holiday_type} />
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style scoped>
  .circle {
    height: 3ch;
    width: 3ch;
    border-radius: 50%;
    border-color: black;
    border-width: 2pt;
  }

  .title {
    height: 8vh;
  }
  .header {
    height: 4vh;
  }
  .day-5 {
    height: 16vh;
  }
  .day-6 {
    height: 14vh;
  }
</style>

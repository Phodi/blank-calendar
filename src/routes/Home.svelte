<script>
  import Month from "../components/Month.svelte";
  import {year} from "../../holiday_data/data.json"

  // Get the current month (1 for January, 2 for February, ..., 12 for December)
  let selectedMonth = new Date().getMonth() + 1;

  // Array to hold month names in local format
  let monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("th-TH", { month: "long" }) + " - " + String(i + 1).padStart(2, "0") + "/" + year
  );

  function printCalendar() {
    const printContent =
      document.getElementById("calendar-container").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
          <html>
            <head>
              <title>${monthNames[selectedMonth - 1]}</title>
              <style>
                @media print {
                  @page {
                    size: A4 landscape;
                    margin: 0;
                  }
                  body {
                    margin: 0;
                  }
                  #calendar-container {
                    page-break-after: always;
                    -webkit-print-color-adjust: exact; 
                  }
                }
              </style>
            </head>
            <body>
              <div id="calendar-container">${printContent}</div>
            </body>
          </html>
        `;

    window.print();

    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore the original content
  }
</script>

<div class="flex flex-col">
  <!-- Container for selector and button -->
  <div class="flex items-end ml-6 mt-6 mb-6 space-x-4">
    <!-- Month Selector -->
    <select
      id="month-select"
      bind:value={selectedMonth}
      class="p-2 border rounded"
    >
      {#each monthNames as monthName, i}
        <option value={i + 1}
          >{monthName}</option
        >
      {/each}
    </select>

    <!-- Print Button -->
    <button on:click={printCalendar} class="p-2 bg-blue-500 text-white rounded">
      Print Calendar
    </button>
  </div>

  <!-- Render the Month Component -->
  <div id="calendar-container">
    <Month bind:monthNumber={selectedMonth} />
  </div>
</div>

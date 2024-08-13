<script>
  import "../holidays.css";

  export let dayNumber; // The day of the month
  export let holidayType; // 0 for normal day, 1 for weekend, 2 for special

  let thead_class = "";

  // Reactive statement to update thead_class when holidayType changes
  $: {
    if (holidayType === 2) {
      thead_class = "specials";
    } else if (holidayType === 1) {
      thead_class = "weekends";
    } else {
      thead_class = "border-b border-dashed border-black";
    }
  }
</script>

<div class="w-full h-full flex items-start justify-center">
  {#if dayNumber}
    <span class={`w-full pb-0.5 ${thead_class}`}>
      <span class="text-lg font-semibold rounded-full border-2 border-black bg-white px-2">
        {dayNumber}
      </span>
    </span>
  {/if}
</div>

$(document).ready(function () {
  const CaloriesPerKm = 60;

  $("#caloriesForm").on("submit", function (element) {
    element.preventDefault();

    const distance = parseFloat($("#distance").val());
    const foodCalories = parseInt($("#food").val());
    const burnedCalories = distance * CaloriesPerKm;

    const remainingCalories =
      foodCalories - burnedCalories > 0 ? foodCalories - burnedCalories : 0;
    const additionalWalking =
      remainingCalories > 0
        ? (remainingCalories / CaloriesPerKm).toFixed(2)
        : 0;

    const progressPercentage =
      (burnedCalories / foodCalories) * 100 > 100
        ? 100
        : (burnedCalories / foodCalories) * 100;

    $("#caloriesConsumed").text(foodCalories);
    $("#burnedCalories").text(burnedCalories);
    $("#additionalWalking").text(additionalWalking);

    $(".progress-bar")
      .css("width", progressPercentage + "%")
      .attr("aria-valuenow", progressPercentage)
      .text(Math.round(progressPercentage) + "%");

    $("#results").removeClass("d-none");
  });
});

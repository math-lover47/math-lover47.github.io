$(document).ready(function () {
  // subscription plan
  $(".column").hover(
    function () {
      // Mouseover: Increase size and change background color
      $(this).css({
        transform: "scale(1.05)",
        transition: "0.3s ease-in-out",
        "box-shadow": "0px 4px 15px rgba(0,0,0,0.2)",
      });
    },
    function () {
      // Mouseout: Revert to original state
      $(this).css({
        transform: "scale(1)",
        "background-color": "transparent",
        transition: "0.3s ease-in-out",
        "box-shadow": "none",
      });
    }
  );

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  $("#consultationBtn").click(function () {
    $(".modal-overlay").fadeIn();
    $(".consultation-options").show();
  });

  $(".modal-overlay").click(function (element) {
    if ($(element.target).hasClass("modal-overlay")) {
      $(".modal-overlay").fadeOut();
      $(".symptomsContainer, .appointmentContainer").hide();
    }
  });

  $("#quickConsultBtn").click(function () {
    $(".consultation-options").hide();
    $(".symptomsContainer").show();
  });

  const recommendationsDB = {
    headache: "Rest in a quiet, dark room. If persistent, consult a doctor.",
    jointPain: "Gentle stretching exercises and physical therapy recommended.",
    backPain: "Apply ice/heat therapy. Schedule physical therapy session.",
    mobility: "Immediate physical therapy evaluation needed.",
    coordination: "Schedule comprehensive evaluation with specialist.",
  };

  $("#symptomsForm").submit(function (element) {
    element.preventDefault();
    let selected = $("#symptoms").val();
    if (!selected || selected.length === 0) {
      alert("Please select at least one symptom");
      return;
    }
    let recommendations = selected.map(
      (symptom) =>
        `<div class="alert alert-info">${symptom}: ${recommendationsDB[symptom]}</div>`
    );
    $("#recommendations").html(recommendations.join(""));
  });

  $("#appointmentBtn").click(function () {
    $(".consultation-options").hide();
    $(".appointmentContainer").show();
  });

  $("#appointmentDate").change(function () {
    const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
    const slotsHtml = timeSlots.map((time) => {
      const isBooked = appointments.some(
        (apt) =>
          apt.date === $("#appointmentDate").val() &&
          apt.time === time &&
          apt.doctor === $("#doctor").val()
      );
      return `<div class="time-slot ${isBooked ? "booked" : ""}" 
                   data-time="${time}">
                   ${time}
              </div>`;
    });
    $("#timeSlots").html(slotsHtml.join(""));
  });

  $(document).on("click", ".time-slot:not(.booked)", function () {
    $(".time-slot").removeClass("selected");
    $(this).addClass("selected");
  });

  $("#appointmentForm").submit(function (element) {
    element.preventDefault();
    const selectedTime = $(".time-slot.selected").data("time");
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }

    const appointment = {
      doctor: $("#doctor").val(),
      date: $("#appointmentDate").val(),
      time: selectedTime,
    };

    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment booked successfully!");
    $(".modal-overlay").fadeOut();
    $(".appointmentContainer").hide();
    $("#appointmentForm")[0].reset();
    $(".time-slot").removeClass("selected");
  });
  $("#doctor").change(function () {
    if ($("#appointmentDate").val()) {
      $("#appointmentDate").trigger("change");
    }
  });
});

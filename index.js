var moment = require("moment");

const input = [
  { date: "2020-01-01", plan: "gold", action: "start" },
  { date: "2020-01-10", plan: "gold", action: "stop" },
  { date: "2020-01-15", plan: "silver", action: "start" },
  { date: "2020-01-21", plan: "silver", action: "stop" },
  { date: "2020-01-21", plan: "bronze", action: "start" },
  { date: "2020-03-01", plan: "bronze", action: "stop" },
  { date: "2020-03-01", plan: "silver", action: "start" },
  { date: "2020-03-10", plan: "silver", action: "stop" },
  { date: "2020-03-11", plan: "gold", action: "start" },
  { date: "2020-03-20", plan: "gold", action: "stop" }
];

const plans = {
  bronze: { index: 3, price: 10 },
  silver: { index: 2, price: 20 },
  gold: { index: 1, price: 30 }
};

//print the result
function print(startdate, stopdate, plan, difference) {
  let startDate = moment(startdate).format("DD MMM");
  let endDate = moment(stopdate).format("DD MMM");
  let total = (difference + 1) * plans[plan].price;
  let data = `${startDate} - ${endDate} - ${plan} - ${total}rs`;
  console.log(data);
}

input.forEach((value, index) => {
  const start = value;
  const stop = input[index + 1];

  var checkStopAndStartHaveSameDate = false;

  if (index !== 0) {
    checkStopAndStartHaveSameDate = input[index - 1].date === start.date;
  }

  if (stop && (start.action === "start" && stop.action == "stop")) {
    const difference = moment(stop.date).diff(moment(start.date), "days");
    const currentMonth = moment(start.date).month();
    const nextMonth = moment(stop.date).month();
    if (currentMonth != nextMonth) {
      const endOfmonth = moment(start.date).endOf("month").format("YYYY-MM-DD");
      const monthdifference = moment(endOfmonth).diff(checkStopAndStartHaveSameDate ? moment(start.date).add(1, "day") : start.date,"days");

      print(checkStopAndStartHaveSameDate ? moment(start.date).add(1, "day") : start.date, endOfmonth, start.plan, monthdifference);

      const secondmonthdifference = moment( checkStopAndStartHaveSameDate ?  moment(stop.date).subtract(1, "day"): moment(stop.date)).diff(moment(endOfmonth).add(1, "day"), "days");
      let secondstartDate = moment(endOfmonth).add(1, "day").format("YYYY-MM-DD");
      let secondendDate = moment(stop.date).subtract(1, "day").format("YYYY-MM-DD");

      print(secondstartDate, secondendDate, start.plan, secondmonthdifference);
    } else {
      print(start.date, stop.date, start.plan, difference);
    }
  }
});


import * as Yup from "yup";

const schema = Yup.object().shape({
  departureValue: Yup.string().required("Departure city is required"),
  destinationValue: Yup.string().required("Destination city is required"),
  departureDate: Yup.date().required("Departure date is required"),
  arrivalDate: Yup.date().when("selectedOption", {
    is: "roundTrip",
    then: Yup.date()
      .required("Arrival date is required")
      .min(
        Yup.ref("departureDate"),
        "Arrival date must be later than or equal to departure date"
      ),
  }),
  selectedOption: Yup.string().required("Please select a trip option"),
});

export default schema;

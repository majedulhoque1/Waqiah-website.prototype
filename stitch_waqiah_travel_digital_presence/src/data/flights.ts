export type Flight = {
  id: string;
  airline: string;
  flightNo: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  price: number;
  cabin: string;
};

export const POPULAR_AIRPORTS = [
  { code: "JFK", city: "New York" },
  { code: "JED", city: "Jeddah" },
  { code: "MED", city: "Madinah" },
  { code: "DAC", city: "Dhaka" },
  { code: "DXB", city: "Dubai" },
  { code: "IST", city: "Istanbul" },
  { code: "LHR", city: "London" },
  { code: "DOH", city: "Doha" },
];

export const SAMPLE_FLIGHTS: Flight[] = [
  {
    id: "f1",
    airline: "Emirates",
    flightNo: "EK 204",
    from: "JFK",
    fromCity: "New York",
    to: "JED",
    toCity: "Jeddah",
    depart: "11:00 PM",
    arrive: "07:45 PM",
    duration: "13h 45m",
    stops: "1 stop · DXB",
    price: 1180,
    cabin: "Economy",
  },
  {
    id: "f2",
    airline: "Qatar Airways",
    flightNo: "QR 702",
    from: "JFK",
    fromCity: "New York",
    to: "JED",
    toCity: "Jeddah",
    depart: "08:20 PM",
    arrive: "06:10 PM",
    duration: "14h 50m",
    stops: "1 stop · DOH",
    price: 1095,
    cabin: "Economy",
  },
  {
    id: "f3",
    airline: "Turkish Airlines",
    flightNo: "TK 12",
    from: "JFK",
    fromCity: "New York",
    to: "MED",
    toCity: "Madinah",
    depart: "12:30 AM",
    arrive: "11:55 PM",
    duration: "16h 25m",
    stops: "1 stop · IST",
    price: 1240,
    cabin: "Economy",
  },
  {
    id: "f4",
    airline: "Saudia",
    flightNo: "SV 22",
    from: "JFK",
    fromCity: "New York",
    to: "JED",
    toCity: "Jeddah",
    depart: "10:55 AM",
    arrive: "06:30 AM",
    duration: "12h 35m",
    stops: "Non-stop",
    price: 1340,
    cabin: "Economy",
  },
  {
    id: "f5",
    airline: "Biman Bangladesh",
    flightNo: "BG 208",
    from: "JFK",
    fromCity: "New York",
    to: "DAC",
    toCity: "Dhaka",
    depart: "04:15 PM",
    arrive: "11:40 PM",
    duration: "20h 25m",
    stops: "1 stop · IST",
    price: 1420,
    cabin: "Economy",
  },
];

export type TripType = "round" | "oneway" | "multi";
export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";

export const CABIN_CLASSES: CabinClass[] = ["Economy", "Premium Economy", "Business", "First"];

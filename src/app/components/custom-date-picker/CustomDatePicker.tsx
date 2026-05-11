// import React, { useEffect, useState } from "react";
// import { TextField, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import {
//   parseISO,
//   startOfWeek,
//   endOfWeek,
//   startOfMonth,
//   endOfMonth,
//   startOfYear,
//   endOfYear,
//   isValid,
// } from "date-fns";

// interface CustomDatePickerProps {
//   urlParamName: string;
// }

// type Preset = "today" | "this_week" | "this_month" | "this_year" | "custom";

// const formatDateUTC = (date: Date) => {
//   // Full ISO string in UTC with time (yyyy-MM-ddTHH:mm:ss.sssZ)
//   return date.toISOString();
// };

// const parseDateUTCToLocal = (dateStr: string) => {
//   // Parse ISO string in UTC and return local Date object
//   const d = new Date(dateStr);
//   return d;
// };

// const getPresetRange = (preset: Preset): [Date, Date] => {
//   const now = new Date();
//   switch (preset) {
//     case "today":
//       return [new Date(now.setHours(0, 0, 0, 0)), new Date(now.setHours(23, 59, 59, 999))];
//     case "this_week":
//       return [startOfWeek(now), endOfWeek(now)];
//     case "this_month":
//       return [startOfMonth(now), endOfMonth(now)];
//     case "this_year":
//       return [startOfYear(now), endOfYear(now)];
//     default:
//       return [now, now];
//   }
// };

// function getUrlParams() {
//   return new URLSearchParams(window.location.search);
// }

// function setUrlParam(param: string, value: string) {
//   const url = new URL(window.location.href);
//   url.searchParams.set(param, value);
//   window.history.replaceState(null, "", url.toString());
// }

// export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ urlParamName }) => {
//   const [preset, setPreset] = useState<Preset>("today");
//   const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

//   // Parse initial value from URL on mount
//   useEffect(() => {
//     const params = getUrlParams();
//     const val = params.get(urlParamName);

//     if (!val) {
//       // default to today
//       const [start, end] = getPresetRange("today");
//       setPreset("today");
//       setRange([start, end]);
//       return;
//     }

//     // Check if val is a preset
//     if (["today", "this_week", "this_month", "this_year"].includes(val)) {
//       setPreset(val as Preset);
//       setRange(getPresetRange(val as Preset));
//     } else {
//       // Assume custom range, format: "startISO_endISO"
//       const parts = val.split("_");
//       if (parts.length === 2) {
//         const start = parseDateUTCToLocal(parts[0]);
//         const end = parseDateUTCToLocal(parts[1]);
//         if (isValid(start) && isValid(end)) {
//           setPreset("custom");
//           setRange([start, end]);
//         } else {
//           // fallback
//           const [startDef, endDef] = getPresetRange("today");
//           setPreset("today");
//           setRange([startDef, endDef]);
//         }
//       }
//     }
//   }, [urlParamName]);

//   // Update URL params whenever preset or range changes
//   useEffect(() => {
//     if (preset === "custom" && range[0] && range[1]) {
//       // set url param as ISOUTC_start_ISOUTC_end (full ISO strings)
//       const startUTC = formatDateUTC(range[0]);
//       const endUTC = formatDateUTC(range[1]);
//       setUrlParam(urlParamName, `${startUTC}_${endUTC}`);
//     } else if (preset !== "custom") {
//       setUrlParam(urlParamName, preset);
//     }
//   }, [preset, range, urlParamName]);

//   // Handlers for preset toggle
//   const handlePresetChange = (
//     event: React.MouseEvent<HTMLElement>,
//     newPreset: Preset | null
//   ) => {
//     if (newPreset !== null) {
//       setPreset(newPreset);
//       if (newPreset !== "custom") {
//         setRange(getPresetRange(newPreset));
//       }
//     }
//   };

//   // Handlers for date-time pickers
//   const handleStartDateChange = (date: Date | null) => {
//     setRange(([_, end]) => [date, end]);
//     setPreset("custom");
//   };

//   const handleEndDateChange = (date: Date | null) => {
//     setRange(([start, _]) => [start, date]);
//     setPreset("custom");
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
//         <ToggleButtonGroup
//           value={preset}
//           exclusive
//           onChange={handlePresetChange}
//           aria-label="Date Range Preset"
//           size="small"
//         >
//           <ToggleButton value="today">Today</ToggleButton>
//           <ToggleButton value="this_week">This Week</ToggleButton>
//           <ToggleButton value="this_month">This Month</ToggleButton>
//           <ToggleButton value="this_year">This Year</ToggleButton>
//           <ToggleButton value="custom">Custom Range</ToggleButton>
//         </ToggleButtonGroup>

//         {preset === "custom" && (
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <DateTimePicker
//               label="Start Date & Time"
//               value={range[0]}
//               onChange={handleStartDateChange}
//               renderInput={(params) => <TextField {...params} />}
//               inputFormat="Pp"
//             />
//             <DateTimePicker
//               label="End Date & Time"
//               value={range[1]}
//               onChange={handleEndDateChange}
//               renderInput={(params) => <TextField {...params} />}
//               inputFormat="Pp"
//             />
//           </Box>
//         )}

//         {preset !== "custom" && range[0] && range[1] && (
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             Selected range: {range[0].toLocaleString()} - {range[1].toLocaleString()}
//           </Typography>
//         )}

//         {preset === "custom" && range[0] && range[1] && (
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             Selected custom range: {range[0].toLocaleString()} - {range[1].toLocaleString()}
//           </Typography>
//         )}
//       </Box>
//     </LocalizationProvider>
//   );
// };

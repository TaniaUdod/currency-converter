import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");

  if (loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />
      </Grid>
    );
  }

  if (error) {
    return "Something went wrong!";
  }

  const dataFilter = data.filter((item) => "currencies" in item);
  const sortedCountries = dataFilter.sort((a, b) => {
    const countryA = a.name.common.toLowerCase();
    const countryB = b.name.common.toLowerCase();
    if (countryA < countryB) {
      return -1;
    }
    if (countryA > countryB) {
      return 1;
    }
    return 0;
  });
  const dataCountries = sortedCountries.map((item) => {
    return `${Object.keys(item.currencies)[0]} - ${item.name.common}`;
  });

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;

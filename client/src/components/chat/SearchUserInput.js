import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "@mui/material/utils";
import { useEffect, useMemo } from "react";

export default function SearchUserInput({
  queryFn,
  users,
  value,
  setValue,
  label,
  disabled = false,
  setUserIds,
}) {
  const [open, setOpen] = React.useState(false);
  const [names, setNames] = React.useState({});
  const [userIdRelation, setUserIdRelation] = React.useState({}); // [userId]: [email]

  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const loading = open && options.length === 0;

  let getUserList = useMemo(
    () =>
      debounce(async (callback) => {
        return callback(await queryFn(inputValue));
      }, 250),
    [inputValue, users]
  );

  useEffect(() => {
    getUserList((opt) => {
      let email = [];
      let names = {};
      let userIdRelation = {};
      opt.forEach((o) => {
        email.push(o.email);
        names[o.email] = o.name;
        userIdRelation[o.email] = o.id;
      });
      setNames((prev) => ({ ...prev, ...names }));
      setUserIdRelation((prev) => ({ ...prev, ...userIdRelation }));
      setOptions(email);
    });
  }, [inputValue, users]);

  return (
    <Autocomplete
      multiple
      disabled={disabled}
      value={value}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        setValue(newValue);

        let userIds = [];
        newValue.forEach((email) => {
          userIds.push(userIdRelation[email]);
        });
        setUserIds(userIds);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => `${names[option]}(${option})`}
      noOptionsText="No Users"
      filterSelectedOptions
      limitTags={2}
      autoHighlight
      includeInputInList
      autoComplete
      renderInput={(params) => (
        <TextField
          size="small"
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

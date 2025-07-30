import { useAppSelector } from "@/hooks";
import { useUserActions } from "@/lib/redux/reducers/users/actions";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

export function useUserSelector({
  required,
  placeholder,
}: {
  required: boolean;
  placeholder?: string;
}) {
  const { users } = useAppSelector((state) => state.user);
  const [selected, setSelected] = useState<ISuggestion | null>(null);
  const { listUsers } = useUserActions();
  listUsers();

  function handleSelect(newValue: SingleValue<ISuggestion>) {
    if (newValue) {
      setSelected(newValue);
    } else {
      setSelected(null);
    }
  }

  const Selector = (
    <div>
      <Select
        options={users.map((user) => ({
          label: user.username,
          value: user.id,
        }))}
        isSearchable
        placeholder={placeholder || "Find User"}
        value={selected}
        onChange={handleSelect}
        isClearable
        className="focus:outline-none focus:border-none text-neutral-800"
        required={required}
      />
    </div>
  );

  return {
    users,
    Selector,
    selected,
    handleSelect,
  };
}

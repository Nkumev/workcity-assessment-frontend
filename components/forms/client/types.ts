type ClientFormProps = {
  client?: IClient | null;
  submitHandler: (dto: CreateClientDto) => void;
  cancelHandler: () => void;
};

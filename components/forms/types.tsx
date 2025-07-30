type DeleteFormProps = {
  confirmHandler: () => Promise<any>;
  cancelHandler: () => void;
  resource: string;
  identifier: string;
};

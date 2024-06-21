import { Topic } from "@/interfaces/Topic";

const DropDownTopic = ({ topic }: { topic: Topic }) => {
  return <div>{topic.Nombre_Tema}</div>;
};

export default DropDownTopic;

import CardComponent from "../Card/CardComponent.js";

const InstitutionListComponent = (props) => {
  return (
    <div className="board">
      {props.data.map((item) => (
        <CardComponent key={item.value.id} data={item} />
      ))}
    </div>
  );
};

export default InstitutionListComponent;

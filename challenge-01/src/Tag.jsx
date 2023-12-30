export default function Tag(props) {
  const { colour, content } = props;

  return (
    <>
      <div className="skill" style={{ background: colour }}>
        {content}
      </div>
    </>
  );
}

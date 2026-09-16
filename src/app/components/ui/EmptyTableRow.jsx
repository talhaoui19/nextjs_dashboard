

const EmptyTableRow = ({ message, description, colSpan }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-center text-base py-8 text-gray-500"
      >
        {message}
        <br />
        {description}
      </td>
    </tr>
  );
};

export default EmptyTableRow;

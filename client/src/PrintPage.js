import React, { useEffect } from "react";
import _ from "underscore";
import styled from "styled-components";

const StyledPrintPage = styled.div`
  display: none;
`;

const PrintTable = styled.table`
  width: 100%;
  text-align: center;
`;

const doPrint = () => {
  var content = document.getElementById("printable");
  var pri = document.getElementById("ifmcontentstoprint").contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
};

const PrintPage = ({ data }) => {
  useEffect(
    () => {
      if (data.body && data.body.length) doPrint();
    },
    [data]
  );
  return (
    <StyledPrintPage id="printable">
      <PrintTable>
        {data.headers && (
          <tr>
            {data.headers.map(h => (
              <th>{h}</th>
            ))}
          </tr>
        )}
        <tbody>
          {data.body &&
            data.body.map(p => (
              <tr>
                {_.map(p, f => (
                  <td>{f.toString()}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </PrintTable>
      <iframe
        id="ifmcontentstoprint"
        title="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      />
    </StyledPrintPage>
  );
};

export default PrintPage;

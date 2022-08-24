export default (pdf_data: any, user: any) => {
  const { tableData, uid } = pdf_data;
  const { firstName, lastName, employeeId, position, backAccount, salary, bank, eps, pensionFund, email } = user;

  const today = new Date();

  return `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Jotta</title>
      <style>
        .clearfix:after {
          content: '';
          display: table;
          clear: both;
        }
  
        a {
          color: #5d6975;
          text-decoration: underline;
        }
  
        body {
          position: relative;
          width: 21cm;
          height: 29.7cm;
          margin: 0 auto;
          color: #001028;
          background: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-family: Arial;
        }
        .contenedor {
          width: 80%;
          max-width: 1000px;
          margin: 0 auto;
          overflow: hidden;
        }
        header {
          padding: 10px 0;
          margin-bottom: 30px;
        }
  
        #logo {
          text-align: center;
          margin-bottom: 10px;
        }
  
        #logo img {
          width: 90px;
        }
  
        h1 {
          border-top: 1px solid #5d6975;
          border-bottom: 1px solid #5d6975;
          color: #5d6975;
          font-size: 2.4em;
          line-height: 1.4em;
          font-weight: normal;
          text-align: center;
          margin: 0 0 20px 0;
          background: url(dimension.png);
        }
  
        #project {
          float: left;
        }
  
        #project span {
          color: #5d6975;
          text-align: right;
          width: 52px;
          margin-right: 10px;
          display: inline-block;
          font-size: 0.8em;
        }
  
        #company {
          float: right;
          text-align: right;
        }
  
        #project div,
        #company div {
          white-space: nowrap;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          margin-bottom: 20px;
        }
  
        table tr:nth-child(2n-1) td {
          background: #f5f5f5;
        }
  
        table th,
        table td {
          text-align: center;
        }
  
        table th {
          padding: 5px 20px;
          color: #5d6975;
          border-bottom: 1px solid #c1ced9;
          white-space: nowrap;
          font-weight: normal;
        }
  
        table .service,
        table .desc {
          text-align: left;
        }
  
        table td {
          padding: 20px;
          text-align: right;
        }
  
        table td.service,
        table td.desc {
          vertical-align: top;
        }
  
        table td.unit,
        table td.qty,
        table td.total {
          font-size: 1.2em;
        }
  
        table td.grand {
          border-top: 1px solid #5d6975;
        }
  
        #notices .notice {
          color: #5d6975;
          font-size: 1.2em;
        }
  
        footer {
          color: #5d6975;
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          border-top: 1px solid #c1ced9;
          padding: 8px 0;
          text-align: center;
        }
  
        @media screen and(max-width: 800px) {
          .body {
            width: 100%;
          }
  
          .footer {
            width: 100%;
          }
  
          .table {
            width: 100%;
          }
  
          .table td {
            width: 100%;
          }
  
          .table th {
            width: 100%;
          }
  
          .tale tr {
            width: 100%;
          }
        }
      </style>
      <script>
        function random() {
          document.getElementById('one').innerHTML = Math.floor(Math.random() * 100);
          document.getElementById('tow').innerHTML = Math.floor(Math.random() * 100);
          document.getElementById('three').innerHTML = Math.floor(Math.random() * 100);
        }
      </script>
    </head>
    <body onload="random();">
      <div class="contenedor">
        <header class="clearfix">
          <div id="logo">
            <img src="logo.jpg" />
          </div>
          <h1>DESPRENDIBLE NOMINA</h1>
          <div id="company" class="clearfix">
            <div>Jotta</div>
            <div>
              NIT,<br />
              901039094-1
            </div>
            <div>(601) 381-9648</div>
            <div>${email}</div>
          </div>
          <div id="project">
            <div><span>Nombre</span> ${firstName} ${lastName}</div>
            <div><span>Empleado</span> ${employeeId}</div>
            <div><span>Cargo</span> ${position}</div>
            <div><span>Email</span> ${email}</div>
            <div><span>Banco</span> ${bank}</div>
            <div><span>Cuenta</span> ${backAccount}</div>
          </div>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th class="service">Codigo</th>
                <th class="desc">Concepto</th>
                <th>Cant</th>
                <th>Pago</th>
                <th>Descuento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="service">11019</td>
                <td class="desc">RERCAGO DIURNO</td>
                <td class="unit"><p id="one"></p></td>
                <td class="qty">$331,548</td>
              </tr>
              <tr>
                <td class="service">17004</td>
                <td class="desc">AUXILIO DE TRANSPORTE</td>
                <td class="unit"><p id="tow"></p></td>
                <td class="qty">$117,172</td>
              </tr>
              <tr>
                <td class="service">11001</td>
                <td class="desc">SUELDO ORDINARIO</td>
                <td class="unit"><p id="three"></p></td>
                <td class="qty">$1,109,010</td>
              </tr>
              <tr>
                <td class="service">22501</td>
                <td class="desc">OBLIGATORIO SALUD</td>
                <td class="unit"></td>
                <td class="qty"></td>
                <td class="total">$57,700</td>
              </tr>
              <tr>
                <td class="service">26601</td>
                <td class="desc">OBLIGATORIO PENSION</td>
                <td class="unit"></td>
                <td class="qty"></td>
                <td class="total">$57,700</td>
              </tr>
              <tr>
                <td class="service">24239</td>
                <td class="desc">DCTO APORTE FESOC CARTERA</td>
                <td class="unit"></td>
                <td class="qty"></td>
                <td class="total">$233,331</td>
              </tr>
              <tr>
                <td class="service">24238</td>
                <td class="desc">DCTO APORTE FESOC CARTERA</td>
                <td class="unit"></td>
                <td class="qty"></td>
                <td class="total">$33,000</td>
              </tr>
              <tr>
                <td colspan="4">TOTAL Y PAGO DESCUENTO</td>
                <td class="total">$1,557,730</td>
              </tr>
  
              <tr>
                <td colspan="4" class="grand total">NETO</td>
                <td class="grand total">$1,175,999</td>
              </tr>
            </tbody>
          </table>
          <div id="notices">
            <div>NOTICE:</div>
            <div class="notice">Desprendible Nomina.</div>
          </div>
        </main>
        <footer>JOTTA</footer>
      </div>
    </body>
  </html>
  
  `;
};

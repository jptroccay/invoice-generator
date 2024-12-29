import { usePDF } from "react-to-pdf";
import logo from "../assets/logo.png";

const Pdf = ({ data }) => {
  const total = data?.productsOptions?.reduce((total, product) => {
    return total + product?.price * product?.quantity;
  }, 0);

  // const iva = data?.productsOptions?.reduce((total, product) => {
  //   return total + product?.price * product?.quantity;
  // }, 0);
  // console.log(total);
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  console.log(date, month, year);
  // console.log(data.productsOptions);
  const { toPDF, targetRef } = usePDF({ filename: "Invoice.pdf" });
  return (
    <div>
      <div className="flex justify-center">
        <button className="btn" onClick={() => toPDF()}>
          Descargar Factura
        </button>
      </div>
      <div ref={targetRef} className="w-[900px]">
        <div className="py-4">
          <div className="px-14 py-6">
            <table className="w-full border-collapse border-spacing-0">
              <tbody>
                <tr>
                  <td className="w-full align-top">
                    <div>
                      {data.logo ? (
                        <img
                          src={data.logo}
                          alt="Logo"
                          className="h-12 object-cover"
                        />
                      ) : (
                        <p className="text-gray-500">Sin Logo</p>
                      )}
                    </div>
                  </td>
                  <td className="align-top">
                    <div className="text-sm">
                      <table className="border-collapse border-spacing-0">
                        <tbody>
                          <tr>
                            <td className="border-r pr-4">
                              <div>
                                <p className="whitespace-nowrap text-slate-400 text-right">
                                  Fecha
                                </p>
                                <p className="whitespace-nowrap font-bold text-main text-right">
                                  {date}-{month}-{year}
                                </p>
                              </div>
                            </td>
                            <td className="pl-4">
                              <div>
                                <p className="whitespace-nowrap text-slate-400 text-right">
                                  Factura #
                                </p>
                                <p className="whitespace-nowrap font-bold text-main text-right">
                                  {data.pv} - {data.number}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-100 px-14 py-6 text-sm">
            <table className="w-full border-collapse border-spacing-0">
              <tbody>
                <tr>
                  <td className="w-1/2 align-top">
                    <div className="text-sm text-neutral-600">
                      <p className="font-bold">{data.company}</p>
                      <p>C.U.I.T: {data.cuit}</p>
                      <p>IIBB: {data.iibb}</p>
                      <p>I.V.A: {data.companyIva}</p>
                      <p>Dirección: {data.address}</p>

                      <p>inicio de Actividades: {data.dateInicio}</p>
                    </div>
                  </td>
                  <td className="w-1/2 align-top text-right">
                    <div className="text-sm text-neutral-600">
                      <p className="font-bold">{data.client}</p>
                      <p>Documeto: {data.clientDni}</p>
                      <p>Dirección: {data.clientAddress}</p>
                      <p>Condición frente al I.V.A: {data.clientIva}</p>
                      <p>Forma de pago: {data.pago}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-14 py-10 text-sm text-neutral-700">
            <table className="w-full border-collapse border-spacing-0">
              <thead>
                <tr>
                  <td className="border-b-2 border-main pb-3 pl-3 font-bold text-main">
                    #
                  </td>
                  <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">
                    Nombre Producto
                  </td>
                  <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
                    Precio
                  </td>
                  <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                    Cantidad.
                  </td>
                  {/* <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                    IVA
                  </td> */}
                  <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">
                    Subtotal
                  </td>
                  {/* <td className="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">
                    Subtotal + VAT
                  </td> */}
                </tr>
              </thead>
              <tbody>
                {data.productsOptions.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b py-3 pl-3">{index + 1}.</td>
                    <td className="border-b py-3 pl-2">{item.name}</td>
                    <td className="border-b py-3 pl-2 text-right">
                      ${item.price}
                    </td>
                    <td className="border-b py-3 pl-2 text-center">
                      {item.quantity}
                    </td>
                    {/* <td className="border-b py-3 pl-2 text-center">
                      {data.iva}%
                    </td> */}
                    <td className="border-b py-3 pl-2 text-right">
                      ${item.price * item.quantity}
                    </td>
                    {/* <td className="border-b py-3 pl-2 pr-3 text-right">
                      ${item.price * item.quantity}
                    </td> */}
                  </tr>
                ))}
                {/* <tr>
                  <td className="border-b py-3 pl-3">2.</td>
                  <td className="border-b py-3 pl-2">
                    Taxation consulting (hour)
                  </td>
                  <td className="border-b py-3 pl-2 text-right">$60.00</td>
                  <td className="border-b py-3 pl-2 text-center">2</td>
                  <td className="border-b py-3 pl-2 text-center">20%</td>
                  <td className="border-b py-3 pl-2 text-right">$120.00</td>
                  <td className="border-b py-3 pl-2 pr-3 text-right">
                    $144.00
                  </td>
                </tr>
                <tr>
                  <td className="border-b py-3 pl-3">3.</td>
                  <td className="border-b py-3 pl-2">Bookkeeping services</td>
                  <td className="border-b py-3 pl-2 text-right">$50.00</td>
                  <td className="border-b py-3 pl-2 text-center">1</td>
                  <td className="border-b py-3 pl-2 text-center">20%</td>
                  <td className="border-b py-3 pl-2 text-right">$50.00</td>
                  <td className="border-b py-3 pl-2 pr-3 text-right">$60.00</td>
                </tr> */}
                <tr>
                  <td colSpan="7">
                    <table className="w-full border-collapse border-spacing-0">
                      <tbody>
                        <tr>
                          <td className="w-full"></td>
                          <td>
                            <table className="w-full border-collapse border-spacing-0">
                              <tbody>
                                <tr>
                                  <td className="border-b p-3">
                                    <div className="whitespace-nowrap text-slate-400">
                                      Net total:
                                    </div>
                                  </td>
                                  <td className="border-b p-3 text-right">
                                    <div className="whitespace-nowrap font-bold text-main">
                                      ${total}
                                    </div>
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td className="p-3">
                                    <div className="whitespace-nowrap text-slate-400">
                                      VAT total:
                                    </div>
                                  </td>
                                  <td className="p-3 text-right">
                                    <div className="whitespace-nowrap font-bold text-main">
                                      $64.00
                                    </div>
                                  </td>
                                </tr> */}
                                <tr>
                                  <td className="bg-main p-3">
                                    <div className="whitespace-nowrap font-bold text-white">
                                      Total:
                                    </div>
                                  </td>
                                  <td className="bg-main p-3 text-right">
                                    <div className="whitespace-nowrap font-bold text-white">
                                      $384.00
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div className="px-14 text-sm text-neutral-700">
            <p className="text-main font-bold">PAYMENT DETAILS</p>
            <p>Banks of Banks</p>
            <p>Bank/Sort Code: 1234567</p>
            <p>Account Number: 123456678</p>
            <p>Payment Reference: BRA-00335</p>
          </div> */}

          <div className="px-14 py-10 text-sm text-neutral-700">
            <p className="text-main font-bold">Nota</p>
            <p className="italic">
              ¡Atención! esta Factura no tiene valor fiscal, esta app se realizó
              a modo de práctica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pdf;

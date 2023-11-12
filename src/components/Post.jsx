import React, { useState } from "react";
import Pdf from "./PDF";

const Post = () => {
  const [pv, setPv] = useState("");
  const [number, setNumber] = useState("");

  const [company, setCompany] = useState("");
  const [cuit, setCuit] = useState("");
  const [iibb, setIibb] = useState("");
  const [companyIva, setCompanyIva] = useState("");
  const [address, setAddress] = useState("");
  const [dateInicio, setDateInicio] = useState("");
  // const [image, setImage] = useState("");

  const [client, setClient] = useState("");
  const [clientDni, setClientDni] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientIva, setClientIva] = useState("Consumidor final");
  const [pago, setPago] = useState("Efectivo");

  const [productsOptions, setProductsOptions] = useState([
    {
      name: "",
      price: "",
      quantity: "",
    },
  ]);

  const [iva, setIva] = useState(21);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit);
  };

  // console.log(productsOptions);
  const addExtra = (e) => {
    setProductsOptions((prev) => {
      return [...prev, { name: "", price: "", quantity: "" }];
    });
  };
  const handleProduct = (index, newProduct) => {
    // console.log({ index, product, newProduct });
    setProductsOptions((prev) => {
      const productsOptions = [...prev];
      productsOptions[index].name = newProduct;
      return productsOptions;
    });
  };
  const handlePrice = (index, newPrice) => {
    // console.log({ index, product, newText });
    setProductsOptions((prev) => {
      const productsOptions = [...prev];
      productsOptions[index].price = newPrice;
      return productsOptions;
    });
  };
  const handleQuantity = (index, newQuantity) => {
    setProductsOptions((prev) => {
      const productsOptions = [...prev];
      productsOptions[index].quantity = newQuantity;
      return productsOptions;
    });
  };

  const removeExtra = (indexToRemove, id) => {
    setProductsOptions((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  const data = {
    pv,
    number,
    company,
    cuit,
    iibb,
    companyIva,
    address,
    dateInicio,
    client,
    clientDni,
    clientIva,
    pago,
    clientAddress,
    productsOptions,
    iva,
  };
  return (
    <>
      {!submit ? (
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-center font-bold text-2xl my-4">
            Invoice Generator
          </h2>
          <form method="post" onSubmit={handleSubmit}>
            <div className="w-full flex-col justify-center gap-12">
              <div>
                <input
                  onChange={(e) => setPv(e.target.value)}
                  type="number"
                  placeholder="P.V"
                  autoComplete="off"
                />
              </div>

              <div>
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  type="number"
                  placeholder="Número"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-row justify-center gap-4">
                {/* SELLER */}
                <div >
                  <h3>Datos Vendedor</h3>
                  <div>
                    <input
                      onChange={(e) => setCompany(e.target.value)}
                      type="text"
                      placeholder="Vendedor/Empresa"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => setCuit(e.target.value)}
                      type="number"
                      placeholder="C.U.I.T"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => setIibb(e.target.value)}
                      type="number"
                      placeholder="I.I.B.B"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="Dirección"
                    />
                  </div>
                  <div>
                    <select onChange={(e) => setCompanyIva(e.target.value)}>
                      <option value="Monotributusta">Monotributusta</option>
                      <option value="Responsable Inscripto">
                        Responsable Inscripto
                      </option>
                    </select>
                  </div>
                  <div>
                    <input
                      onChange={(e) => setDateInicio(e.target.value)}
                      type="date"
                      placeholder="Fecha inicio actividad"
                      autoComplete="off"
                    />
                  </div>
                </div>
                {/* CLIENT */}
                <div>
                  <h3>Datos Cliente</h3>
                  <div className="">
                    <input
                      onChange={(e) => setClient(e.target.value)}
                      type="text"
                      placeholder="Cliente/empresa"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => setClientAddress(e.target.value)}
                      type="text"
                      placeholder="Dirección"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => setClientDni(e.target.value)}
                      type="number"
                      placeholder="DNI"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <select onChange={(e) => setClientIva(e.target.value)}>
                      <option value="Consumidor final">Consumidor final</option>
                      <option value="Monotributusta">Monotributusta</option>
                      <option value="Responsable Inscripto">
                        Responsable Inscripto
                      </option>
                    </select>
                  </div>
                  <div>
                    <select onChange={(e) => setPago(e.target.value)}>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Débito">Débito</option>
                      <option value="Crédito">Crédito</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {/* PRODUCT */}
              <label>Productos</label>
              {productsOptions.length > 0 &&
                productsOptions.map((product, index) => (
                  <div
                    className="flex justify-center items-center gap-2"
                    key={index}
                  >
                    <div className="flex flex-col w-full my-2">
                      <input
                        className="border-color-black shadow-xl px-3 py-2 w-full focus:outline-none border"
                        type="text"
                        placeholder="Producto"
                        value={product.name}
                        onChange={(ev) => handleProduct(index, ev.target.value)}
                      />
                    </div>
                    <div className="flex flex-col w-full my-2">
                      <input
                        className="border-color-black shadow-xl px-3 py-2  w-full focus:outline-none border"
                        type="number"
                        placeholder="Precio"
                        value={product.price}
                        onChange={(e) => handlePrice(index, e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col w-full my-2">
                      <input
                        className="border-color-black shadow-xl px-3 py-2  w-full focus:outline-none border"
                        type="number"
                        placeholder="Cantidad"
                        value={product.quantity}
                        onChange={(e) => handleQuantity(index, e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        onClick={() => removeExtra(index)}
                        type="button"
                        className="bg-red-400 hover:bg-red-500 py-3 px-3 text-white font-bold rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              <div>
                <button
                  onClick={addExtra}
                  type="button"
                  className="bg-green-500 hover:bg-green-600 py-3 px-3 text-white font-bold rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* <div className="flex flex-col w-full my-2">
              <label>IVA %</label>
              <input
                className="border-color-black shadow-xl px-3 py-2  w-full focus:outline-none border"
                type="number"
                placeholder="IVA"
                onChange={(e) => setIva(e.target.value)}
              />
            </div> */}

            <div className="flex justify-center">
              <button className="btn" type="submit">
                Generar Factura
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Pdf data={data} />
      )}
    </>
  );
};

export default Post;

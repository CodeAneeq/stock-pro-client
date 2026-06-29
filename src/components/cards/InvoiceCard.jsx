import { MdOutlineInventory2 } from "react-icons/md";

export default function InvoiceCard({
  invoice
}) {

  return (
    <div className="min-h-screen  px-4 py-6 flex flex-col gap-4 max-[400px]:px-1 max-[340px]:px-0">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl mx-auto overflow-hidden print:shadow-none print:border-0">

        <div className="px-8 pt-8 pb-6 flex justify-between items-start max-[380px]:px-3">
          <div>
            <h1 className=" font-bold text-gray-900"><span className="text-2xl">Invoice # </span><span className="text-sm">{invoice?._id}</span></h1>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Customer Name</p>
            <p className="text-base font-bold text-gray-900">{invoice?.customerName}</p>
            <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mt-2">Date</p>
            <p className="text-sm text-gray-700">{invoice?.createdAt?.slice(11, 19) + " " + invoice?.createdAt?.replace("T", "")?.slice(0, 9)}</p>
          </div>
        </div>

        <hr className="border-gray-100 mx-8" />

        <div className="px-8 py-5 max-[380px]:px-3">
          <div className="grid grid-cols-4 text-[10px] font-semibold tracking-widest text-gray-400 uppercase pb-3 border-b border-gray-100">
            <span>Item</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Price per Item</span>
            <span className="text-right">Total</span>
          </div>

          {invoice?.products?.map((item) => (
            <div
              key={item.productId}
              className="grid grid-cols-4 items-center py-4 border-b border-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <MdOutlineInventory2 className="text-base" />
                </span>
                <span className="text-sm font-medium text-gray-800">{item.name}</span>
              </div>
              <span className="text-sm text-gray-600 text-center">{item.qty}</span>
              <span className="text-sm text-gray-600 text-right">
                Rs. {item.price.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-gray-800 text-right">
                Rs. {(item.total).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="px-8 pb-6 flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <span>Subtotal:</span>
            <span>Rs. {invoice?.grandTotal?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-base font-bold text-gray-900">Grand Total:</span>
            <span className="text-xl font-bold text-blue-600">
              Rs. {invoice?.grandTotal?.toLocaleString()}
            </span>
          </div>
        </div>

        <hr className="border-gray-100 mx-8" />

        <div className="bg-gray-50 px-8 py-3 text-center text-[11px] text-gray-400 border-t border-gray-100">
          This is a computer-generated document for StockPro Inventory System. No signature required.
        </div>
      </div>
    </div>
  );
}
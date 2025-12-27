import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Image as ImageIcon, Save, ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import AddressBlock from './form-parts/AddressBlock';
import LineItemTable from './form-parts/LineItemTable';
import { numberToWords } from '../../utils/invoiceUtils';
import { generateInvoicePDF } from '../../utils/generateInvoicePDF';

// --- Zod Schema ---
const invoiceSchema = z.object({
  invoiceNo: z.string(),
  date: z.string(),
  billedBy: z.object({ 
    businessName: z.string(), phone: z.string(), city: z.string(), country: z.string(), 
    zip: z.string(), state: z.string(), email: z.string(), pan: z.string(), gstin: z.string(), address: z.string() 
  }),
  billedTo: z.object({ 
    businessName: z.string().min(1, "Client Name Required"), phone: z.string(), city: z.string(), country: z.string(), 
    zip: z.string(), state: z.string(), email: z.string(), pan: z.string(), gstin: z.string(), address: z.string() 
  }),
  items: z.array(z.object({
    name: z.string().min(1, "Item name needed"),
    quantity: z.coerce.number().min(1),
    rate: z.coerce.number().min(0),
    gstRate: z.coerce.number(),
    amount: z.number(),
    cgst: z.number(),
    sgst: z.number(),
    total: z.number(),
    hsn: z.string().optional()
  }))
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  const methods = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNo: 'INV-2025-0001',
      date: new Date().toISOString().split('T')[0],
      // UPDATED: Default Country to Canada
      billedBy: { businessName: '', phone: '', city: '', country: 'Canada', zip: '', state: '', email: '', pan: '', gstin: '', address: '' },
      billedTo: { businessName: '', phone: '', city: '', country: 'Canada', zip: '', state: '', email: '', pan: '', gstin: '', address: '' },
      // UPDATED: Default Tax Rate to 13% (Standard HST)
      items: [{ name: '', quantity: 1, rate: 0, gstRate: 13, amount: 0, cgst: 0, sgst: 0, total: 0 }]
    }
  });

  const { watch, handleSubmit, getValues } = methods;
  const items = watch('items');

  // Calculate Totals
  const subTotal = items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  const totalPST = items?.reduce((sum, item) => sum + (item.sgst || 0), 0) || 0; // Using SGST column for PST
  const totalGST = items?.reduce((sum, item) => sum + (item.cgst || 0), 0) || 0; // Using CGST column for GST
  const grandTotal = items?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;

  // --- API SAVE HANDLER ---
  const onSave = async (data: InvoiceFormData) => {
    setIsSaving(true);
    try {
      const apiPayload = {
        invoiceNumber: data.invoiceNo,
        invoiceDate: data.date,
        dueDate: data.date, 
        clientId: 1, 
        clientName: data.billedTo.businessName, 
        items: data.items.map(item => ({
          name: item.name,
          hsn: item.hsn, // You can rename this to 'sku' later if needed
          quantity: item.quantity,
          rate: item.rate,
          gstPercent: item.gstRate
        }))
      };

      const response = await fetch('http://localhost:5011/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend save failed: ${errorText}`);
      }

      alert("Invoice Saved Successfully!");
      navigate('/invoices'); 

    } catch (error) {
      console.error("Save Error:", error);
      alert(`Error saving to database: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    const currentData = getValues();
    if (!currentData.billedTo.businessName) {
      alert("Please enter a Client Name before downloading.");
      return;
    }
    generateInvoicePDF(currentData);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSave, (errors) => alert("Please fix validation errors."))}>
            
            {/* Top Actions */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <button 
                type="button" 
                onClick={() => navigate('/invoices')} 
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" /> Back to Invoices
              </button>
              
              <div className="flex items-center gap-3">
                 <button 
                   type="button" 
                   onClick={handleDownloadPDF}
                   className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 text-sm flex items-center transition-colors"
                 >
                    <Download size={16} className="mr-2"/> Download PDF
                 </button>

                 <button 
                    type="submit" 
                    disabled={isSaving}
                    className={`text-white px-6 py-2 rounded-lg flex items-center shadow-lg transition-all 
                    ${isSaving ? 'bg-pink-400 cursor-not-allowed' : 'bg-[#E91E63] hover:bg-pink-700 shadow-pink-500/20'}`}
                 >
                  {isSaving ? "Saving..." : (
                    <>
                      <Save size={18} className="mr-2" /> Save Invoice
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-8">
              <div className="space-y-6 w-full md:w-1/3">
                <h1 className="text-4xl font-bold text-gray-800">Invoice <span className="text-gray-300 font-light">#</span></h1>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold text-gray-600 w-24">Invoice No<span className="text-red-500">*</span></label>
                    <input {...methods.register('invoiceNo')} className="border-b border-gray-300 focus:border-indigo-500 focus:outline-none py-1 w-full text-gray-800 font-medium bg-transparent" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold text-gray-600 w-24">Date<span className="text-red-500">*</span></label>
                    <div className="relative w-full">
                      <input type="date" {...methods.register('date')} className="border-b border-gray-300 focus:border-indigo-500 focus:outline-none py-1 w-full text-gray-800 bg-transparent" />
                      <Calendar size={16} className="absolute right-0 top-1.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="bg-gray-100 p-3 rounded-full mb-2 group-hover:bg-white transition-colors">
                   <ImageIcon size={24} className="text-gray-400 group-hover:text-indigo-500" />
                </div>
                <span className="text-sm font-medium">Add Business Logo</span>
                <span className="text-xs mt-1 text-gray-400">Resolution up to 1080x1080px</span>
              </div>
            </div>

            {/* Address Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <AddressBlock title="Billed By (Your Details)" prefix="billedBy" register={methods.register} />
              <AddressBlock title="Billed To (Client Details)" prefix="billedTo" register={methods.register} />
            </div>

            {/* Items Table */}
            <LineItemTable />

            {/* Summary Section */}
            <div className="flex flex-col md:flex-row justify-between mt-10 gap-12">
              <div className="w-full md:w-1/2">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Total in Words</h3>
                  <p className="text-gray-600 italic">
                    {/* Make sure your utils/invoiceUtils function supports Dollars! */}
                    {numberToWords(grandTotal)}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      {/* UPDATED SYMBOL TO $ */}
                      <span className="font-medium">${subTotal.toFixed(2)}</span>
                    </div>
                    {/* UPDATED LABELS TO GST/PST */}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>GST / HST</span>
                      <span className="font-medium">${totalGST.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>PST</span>
                      <span className="font-medium">${totalPST.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-300 my-4 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total (CAD)</span>
                    <span className="text-2xl font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="h-20 border-b-2 border-gray-300 border-dashed mb-2"></div>
                  <p className="text-right text-xs text-gray-500 uppercase tracking-wider font-medium">Authorized Signature</p>
                </div>
              </div>
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
}
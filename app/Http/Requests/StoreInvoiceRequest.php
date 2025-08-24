<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'customer_id'   => 'required|exists:customers,id',
            'type'          => 'required|in:invoice,quotation',
            'invoice_date'  => 'required|date',
            'due_date'      => 'nullable|date|after_or_equal:invoice_date',
            'payment_method'=> 'nullable|in:cash,bank transfer,mobile money',
            'status'        => 'nullable|in:draft,sent,paid,cancelled',
            'description'   => 'required|array',
            'description.*' => 'required|string|max:255',
            'quantity'      => 'required|array',
            'quantity.*'    => 'required|numeric|min:1',
            'unit_price'    => 'required|array',
            'unit_price.*'  => 'required|numeric|min:0',
            'tax_rate'      => 'nullable|array',
            'tax_rate.*'    => 'nullable|numeric|min:0',
            'discount'      => 'nullable|numeric|min:0|max:100',
        ];
    }
}

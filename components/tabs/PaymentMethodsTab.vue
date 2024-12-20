<template>
  <div>
    <div class="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div class="panel">
        <div class="mb-5">
          <h5 class="mb-4 text-lg font-semibold">Payment History</h5>
          <p>
            Changes to your <span class="text-primary">Payment Method</span> information will take effect starting with scheduled payment and will be refelected
            on your next invoice.
          </p>
        </div>
        <div class="mb-5">
          <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
            <div class="flex items-start justify-between py-3">
              <div class="flex-none ltr:mr-4 rtl:ml-4">
                <img src="/assets/images/card-americanexpress.svg" alt="" />
              </div>
              <h6 class="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                Mastercard
                <span class="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">XXXX XXXX XXXX 9704</span>
              </h6>
              <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                <button class="btn btn-dark">Edit</button>
              </div>
            </div>
          </div>
          <div class="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
            <div class="flex items-start justify-between py-3">
              <div class="flex-none ltr:mr-4 rtl:ml-4">
                <img src="/assets/images/card-mastercard.svg" alt="" />
              </div>
              <h6 class="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                American Express<span class="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">XXXX XXXX XXXX 310</span>
              </h6>
              <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                <button class="btn btn-dark">Edit</button>
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-start justify-between py-3">
              <div class="flex-none ltr:mr-4 rtl:ml-4">
                <img src="/assets/images/card-visa.svg" alt="" />
              </div>
              <h6 class="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                Visa<span class="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">XXXX XXXX XXXX 5264</span>
              </h6>
              <div class="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                <button class="btn btn-dark">Edit</button>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary">Add Payment Method</button>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div class="panel">
        <div class="mb-5">
          <h5 class="mb-4 text-lg font-semibold">Add Billing Address</h5>
          <p>Changes your New <span class="text-primary">Billing</span> Information.</p>
        </div>
        <div class="mb-5">
          <form>
            <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="billingName">Name</label>
                <input id="billingName" type="text" placeholder="Enter Name" class="form-input" />
              </div>
              <div>
                <label for="billingEmail">Email</label>
                <input id="billingEmail" type="email" placeholder="Enter Email" class="form-input" />
              </div>
            </div>
            <div class="mb-5">
              <label for="billingAddress">Address</label>
              <input id="billingAddress" type="text" placeholder="Enter Address" class="form-input" />
            </div>
            <div class="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div class="md:col-span-2">
                <label for="billingCity">City</label>
                <input id="billingCity" type="text" placeholder="Enter City" class="form-input" />
              </div>
              <div>
                <label for="billingState">State</label>
                <select id="billingState" class="form-select text-white-dark">
                  <option>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div>
                <label for="billingZip">Zip</label>
                <input id="billingZip" type="text" placeholder="Enter Zip" class="form-input" />
              </div>
            </div>
            <button type="button" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
      <div class="panel">
        <div class="mb-5">
          <h5 class="mb-4 text-lg font-semibold">Add Payment Method</h5>
          <p>Changes your New <span class="text-primary">Payment Method</span> Information.</p>
        </div>
        <div class="mb-5">
          <form>
            <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="payBrand">Card Brand</label>
                <select id="payBrand" class="form-select text-white-dark">
                  <option selected>Mastercard</option>
                  <option>American Express</option>
                  <option>Visa</option>
                  <option>Discover</option>
                </select>
              </div>
              <div>
                <label for="payNumber">Card Number</label>
                <input id="payNumber" type="text" placeholder="Card Number" class="form-input" />
              </div>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="payHolder">Holder Name</label>
                <input id="payHolder" type="text" placeholder="Holder Name" class="form-input" />
              </div>
              <div>
                <label for="payCvv">CVV/CVV2</label>
                <input id="payCvv" type="text" placeholder="CVV" class="form-input" />
              </div>
            </div>
            <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="payExp">Card Expiry</label>
                <input id="payExp" type="text" placeholder="Card Expiry" class="form-input" />
              </div>
            </div>
            <button type="button" class="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

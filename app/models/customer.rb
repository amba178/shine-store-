class Customer < ApplicationRecord
	 has_many :customers_shipping_address 
	 has_one  :customers_billing_address
     has_one  :billing_address, through: :customers_billing_address, 
                             source: :address
end

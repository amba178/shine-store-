#1
RSpec::Matchers.define :violate_check_constraint do |constraint_name|
	#2 
	supports_block_expectations 
	#3
	match do |code_to_test|
		begin 
			#4
			code_to_test.()
			#5
			false
			#6
		rescue ActiveRecord::StatementInvalid => ex 
			#7 
			ex.message =~ /#{constraint_name}/
		end
	end
end
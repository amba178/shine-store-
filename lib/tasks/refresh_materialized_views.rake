namespace :refresh_materialized_views do
	desc ">> Refreshes materialized views"
		task refresh: :environment do 
			ActiveRecord::Base.connection.execute %{
				REFRESH MATERIALIZED VIEW CONCURRENTLY customer_details
			}
 		end
end


# rake namespace:task 

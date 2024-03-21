def get_price_per_gallon():
    val=1.5
    return val

def calculate_suggested_price(location, gallons_requested, has_history):
    current_price_per_gallon = float(get_price_per_gallon())
    location_factor = 0.02 if location == 'TX' else 0.04
    rate_history_factor = 0.01 if has_history else 0.0
    gallons_requested = int(gallons_requested)  # Convert to integer before comparison
    gallons_requested_factor = 0.02 if gallons_requested > 1000 else 0.03
    company_profit_factor = 0.1  # 10%
    
    margin = current_price_per_gallon * (location_factor - rate_history_factor + gallons_requested_factor + company_profit_factor)
    suggested_price = current_price_per_gallon + margin
    
    return round(suggested_price,3)


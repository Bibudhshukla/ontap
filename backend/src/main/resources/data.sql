-- Seed services (only if the table is empty)
INSERT INTO services (name, description, icon, price_range, category)
SELECT * FROM (
    SELECT 'Plumbing' AS name, 'Professional plumbing services for all your needs' AS description, 'wrench' AS icon, 'Rs.500-2000/hr' AS price_range, 'Home Services' AS category UNION ALL
    SELECT 'Cleaning', 'Deep cleaning and regular maintenance', 'sparkles', 'Rs.800-1500/hr', 'Home Services' UNION ALL
    SELECT 'Carpentry', 'Furniture repair and custom woodwork', 'hammer', 'Rs.600-2500/hr', 'Home Services' UNION ALL
    SELECT 'Electrical', 'Safe and certified electrical work', 'zap', 'Rs.700-2000/hr', 'Home Services' UNION ALL
    SELECT 'HVAC', 'AC installation and repair services', 'thermometer', 'Rs.1000-3000/hr', 'Home Services' UNION ALL
    SELECT 'Painting', 'Interior and exterior painting services', 'paint-bucket', 'Rs.500-1800/hr', 'Home Services' UNION ALL
    SELECT 'Appliance Repair', 'Fix all home appliances', 'settings', 'Rs.800-2500/hr', 'Home Services' UNION ALL
    SELECT 'Pest Control', 'Complete pest elimination services', 'bug', 'Rs.1500-4000/service', 'Home Services' UNION ALL
    SELECT 'Landscaping', 'Garden maintenance and design', 'tree', 'Rs.1000-3000/hr', 'Outdoor' UNION ALL
    SELECT 'Moving Services', 'Professional packing and moving', 'truck', 'Rs.2000-5000/service', 'Logistics' UNION ALL
    SELECT 'Pet Care', 'Pet grooming and sitting services', 'heart', 'Rs.500-1500/hr', 'Pet Services' UNION ALL
    SELECT 'Handyman', 'General home repairs and maintenance', 'tools', 'Rs.600-1800/hr', 'Home Services'
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM services);

-- Seed demo users (password is plain text for demo: "password123")
INSERT INTO users (name, email, phone, password, user_type)
SELECT * FROM (
    SELECT 'Amit Kumar' AS name, 'amit@example.com' AS email, '+91-9876543210' AS phone, 'password123' AS password, 'customer' AS user_type UNION ALL
    SELECT 'Rajesh Sharma', 'rajesh@example.com', '+91-9876543211', 'password123', 'provider' UNION ALL
    SELECT 'Priya Singh', 'priya@example.com', '+91-9876543212', 'password123', 'customer' UNION ALL
    SELECT 'Vijay Patel', 'vijay@example.com', '+91-9876543213', 'password123', 'provider'
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM users);

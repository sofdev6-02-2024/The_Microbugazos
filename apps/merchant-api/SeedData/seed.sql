INSERT INTO public."Category" ("Id", "ParentCategoryId", "Name", "CreatedAt", "UpdatedAt", "DeletedAt", "IsActive")
VALUES
-- Categorías principales
('89838a71-1679-4cca-bfce-720388fbb3a7', NULL, 'Electronics', NOW(), NULL, NULL, TRUE),
('62211b84-a0d2-41e9-8748-23ecd22cf674', NULL, 'Clothing & Fashion', NOW(), NULL, NULL, TRUE),
('cbc0673e-55d4-4a9f-8d10-08af453ec8b0', NULL, 'Beauty & Personal Care', NOW(), NULL, NULL, TRUE),
('af3c1050-fc5a-4e17-a6db-98dcb13584f1', NULL, 'Home & Kitchen', NOW(), NULL, NULL, TRUE),
('373f70cc-4277-4377-88bf-3dca3f589d0a', NULL, 'Health & Wellness', NOW(), NULL, NULL, TRUE),

-- Subcategorías de Electronics
('0d88360e-062c-4b2d-b456-c840a7759b29', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Mobile Phones', NOW(), NULL, NULL, TRUE),
('8cbd2fcb-dab9-4062-b87a-d1aad3206d51', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Laptops & Computers', NOW(), NULL, NULL, TRUE),
('ba3bfc6a-5273-4b4a-aebd-0874dc591f6c', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Cameras & Photography', NOW(), NULL, NULL, TRUE),
('426d939c-7728-4aa4-9776-3f35f4adcadb', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Audio Equipment', NOW(), NULL, NULL, TRUE),
('970d81b0-c882-4d4a-b031-89972a6a4141', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Wearable Technology', NOW(), NULL, NULL, TRUE),
('18b10cbf-1a01-4f1e-a8ea-f6f25226a447', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Smart Home Devices', NOW(), NULL, NULL, TRUE),
('5ff38c1c-d5a5-437f-860a-c2fcd83058e2', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Television & Video', NOW(), NULL, NULL, TRUE),
('ebb92cbd-357d-4fc0-856c-35fce567c552', '89838a71-1679-4cca-bfce-720388fbb3a7', 'Gaming Consoles', NOW(), NULL, NULL, TRUE),

-- Subcategorías de Clothing & Fashion
('4e107fc4-d2ba-45e3-8e42-33efbbced032', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Men''s Clothing', NOW(), NULL, NULL, TRUE),
('13d27a5f-eb69-4143-ad3a-e55f5f2e7a7f', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Women''s Clothing', NOW(), NULL, NULL, TRUE),
('0f396b2a-74e5-4e91-9ca2-4da607009f02', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Kids'' Clothing', NOW(), NULL, NULL, TRUE),
('be7aa93f-6cc3-4b09-a965-0ef3ce89bd4a', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Footwear', NOW(), NULL, NULL, TRUE),
('7df8c395-eafa-4d2d-8792-651ed65941de', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Accessories', NOW(), NULL, NULL, TRUE),
('d8ab1bdc-f44b-41e3-b7c4-d1075caecb6b', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Jewelry', NOW(), NULL, NULL, TRUE),
('6313e912-7abe-4289-b4e7-da7cd29f5a08', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Watches', NOW(), NULL, NULL, TRUE),
('e01bfe08-8e79-4f2c-afc1-f1e373f91292', '62211b84-a0d2-41e9-8748-23ecd22cf674', 'Handbags & Wallets', NOW(), NULL, NULL, TRUE),

-- Subcategorías de Beauty & Personal Care
('5731118a-8757-4c2a-b9fa-164e3dc436a0', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Skincare', NOW(), NULL, NULL, TRUE),
('c78b32e8-4006-423a-bbc6-2241bbdb4a86', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Hair Care', NOW(), NULL, NULL, TRUE),
('6a3ef94b-307d-44c9-b89c-a5ccbd9a83b9', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Makeup', NOW(), NULL, NULL, TRUE),
('d8a8e9f9-92ab-48ba-b145-1d8bf9cecf3c', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Fragrances', NOW(), NULL, NULL, TRUE),
('f9f92b79-12ae-4a0f-b437-4f06df8616d2', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Personal Hygiene', NOW(), NULL, NULL, TRUE),
('cbc181a8-39de-4d28-95ab-1b8b4c16973f', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Men''s Grooming', NOW(), NULL, NULL, TRUE),
('94b6316b-b3f3-4a33-b541-9118042eb5cb', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Oral Care', NOW(), NULL, NULL, TRUE),
('43cb5b9c-a4cc-4565-8b0c-dbce05478820', 'cbc0673e-55d4-4a9f-8d10-08af453ec8b0', 'Bath & Body', NOW(), NULL, NULL, TRUE),

-- Subcategorías de Home & Kitchen
('52278e1d-1cbd-423b-b4b7-d1becaba2c10', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Furniture', NOW(), NULL, NULL, TRUE),
('9785208c-4a74-4655-ba8a-bb1c3648221d', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Home Decor', NOW(), NULL, NULL, TRUE),
('ebde1c50-d9d9-413e-8c6a-c7e3ca379596', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Kitchen & Dining', NOW(), NULL, NULL, TRUE),
('8d9da052-e2e3-4463-91a1-1c30def01b77', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Bedding & Linens', NOW(), NULL, NULL, TRUE),
('23fa052d-f186-4cf4-b560-40ed59f79a82', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Cleaning Supplies', NOW(), NULL, NULL, TRUE),
('2da42f8a-aae2-4223-8c4c-956fad8c1152', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Storage & Organization', NOW(), NULL, NULL, TRUE),
('26d89761-d0ce-48c8-acad-5f45995f7fb2', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Lighting', NOW(), NULL, NULL, TRUE),
('81922707-744e-41a2-929a-f851918fe3b3', 'af3c1050-fc5a-4e17-a6db-98dcb13584f1', 'Outdoor & Garden', NOW(), NULL, NULL, TRUE),

-- Subcategorías de Health & Wellness
('c5aca14d-57ad-4f40-9efd-a639736e02b1', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'Supplements & Vitamins', NOW(), NULL, NULL, TRUE),
('689573b4-3680-418b-abfd-e882cd0d5f36', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'Fitness Equipment', NOW(), NULL, NULL, TRUE),
('a496b490-355d-4383-b991-9b50b3187053', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'Medical Supplies', NOW(), NULL, NULL, TRUE),
('be1bd1ba-426f-43f4-bfdb-d992bd48a686', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'Personal Care Appliances', NOW(), NULL, NULL, TRUE),
('76029ee9-a06a-4af5-84c9-ce72642fc538', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'Mental Wellness', NOW(), NULL, NULL, TRUE),
('c26f09eb-f7ec-4524-9367-26ee4616b3d5', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'First Aid', NOW(), NULL, NULL, TRUE),
('f0cadf66-82f1-4829-a057-b87a40d1476b', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'Yoga & Meditation', NOW(), NULL, NULL, TRUE),
('4a9c5571-6234-48b3-bfac-cc02e5edd156', '373f70cc-4277-4377-88bf-3dca3f589d0a', 'Massage & Relaxation', NOW(), NULL, NULL, TRUE);





INSERT INTO public."PaymentMethod"(
	"Id", "Name", "CreatedAt", "UpdatedAt", "DeletedAt", "IsActive")
VALUES 
	('a000f1fb-5180-43fa-9855-5e901f36a2bb', 'Credit Card', '2024-11-20 12:00:00', '2024-11-20 12:00:00', NULL, TRUE),
	('964ad561-8a8b-4292-afb8-8ae6fb884093', 'PayPal', '2024-11-20 12:00:00', '2024-11-20 12:00:00', NULL, TRUE);




INSERT INTO public."User"(
	"Id", "Name", "Email", "IdentityId", "UserType", "CreatedAt", "UpdatedAt", "IsActive")
	VALUES ('5be627d7-994d-473a-a108-6db3ad9d0380', 'majevos430', 'majevos430@merotx.com','xJwPgOhhhiPFD8zxJN1Mrs4a3cq2',1, NOW(),NOW(),TRUE);
	

INSERT INTO public."Store"(
    "Id", "Name", "Description", "Address", "PhoneNumber", "BannerImage", "ProfileImage", "UserId", "SellerIds", "CreatedAt", "UpdatedAt", "IsActive")
VALUES (
    'a0a7f43a-8417-4250-9402-7c5a8f21d5fe',
    'Target Store',
    'Your go-to destination for streamlined shopping. Focus on what truly matters and order only what you need, saving time and avoiding unnecessary clutter!',
    '123 Calatayut street, Cochabamba', 
    '59179360535',
    'https://firebasestorage.googleapis.com/v0/b/merchant-auth-9c7f2.appspot.com/o/images%2Fstore%2F5be627d7-994d-473a-a108-6db3ad9d0380-banner?alt=media&token=fbf646bc-0b17-487b-8d20-12ab141e8904',
    'https://firebasestorage.googleapis.com/v0/b/merchant-auth-9c7f2.appspot.com/o/images%2Fstore%2F5be627d7-994d-473a-a108-6db3ad9d0380-profile?alt=media&token=f11f9de2-74d2-408f-a19c-b5a1f2f0426d',
    '5be627d7-994d-473a-a108-6db3ad9d0380',
	'',
    NOW(),
    NOW(),
    TRUE
);




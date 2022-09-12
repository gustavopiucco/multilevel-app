--
-- Sets
--

SET timezone='UTC';
SET client_encoding = 'UTF8';

--
-- Drop schema
--

DROP SCHEMA public CASCADE; /* CASCADE will delete all relations */
CREATE SCHEMA public;

--
-- Countries table
--

CREATE TABLE countries (
    id VARCHAR(10) PRIMARY KEY NOT NULL, 
    name VARCHAR(64) NOT NULL
);

INSERT INTO "countries" ("id", "name") VALUES (E'AF', E'Afghanistan');
INSERT INTO "countries" ("id", "name") VALUES (E'AX', E'Åland Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'AL', E'Albania');
INSERT INTO "countries" ("id", "name") VALUES (E'DZ', E'Algeria');
INSERT INTO "countries" ("id", "name") VALUES (E'AS', E'American Samoa');
INSERT INTO "countries" ("id", "name") VALUES (E'AD', E'Andorra');
INSERT INTO "countries" ("id", "name") VALUES (E'AO', E'Angola');
INSERT INTO "countries" ("id", "name") VALUES (E'AI', E'Anguilla');
INSERT INTO "countries" ("id", "name") VALUES (E'AQ', E'Antarctica');
INSERT INTO "countries" ("id", "name") VALUES (E'AG', E'Antigua & Barbuda');
INSERT INTO "countries" ("id", "name") VALUES (E'AR', E'Argentina');
INSERT INTO "countries" ("id", "name") VALUES (E'AM', E'Armenia');
INSERT INTO "countries" ("id", "name") VALUES (E'AW', E'Aruba');
INSERT INTO "countries" ("id", "name") VALUES (E'AC', E'Ascension Island');
INSERT INTO "countries" ("id", "name") VALUES (E'AU', E'Australia');
INSERT INTO "countries" ("id", "name") VALUES (E'AT', E'Austria');
INSERT INTO "countries" ("id", "name") VALUES (E'AZ', E'Azerbaijan');
INSERT INTO "countries" ("id", "name") VALUES (E'BS', E'Bahamas');
INSERT INTO "countries" ("id", "name") VALUES (E'BH', E'Bahrain');
INSERT INTO "countries" ("id", "name") VALUES (E'BD', E'Bangladesh');
INSERT INTO "countries" ("id", "name") VALUES (E'BB', E'Barbados');
INSERT INTO "countries" ("id", "name") VALUES (E'BY', E'Belarus');
INSERT INTO "countries" ("id", "name") VALUES (E'BE', E'Belgium');
INSERT INTO "countries" ("id", "name") VALUES (E'BZ', E'Belize');
INSERT INTO "countries" ("id", "name") VALUES (E'BJ', E'Benin');
INSERT INTO "countries" ("id", "name") VALUES (E'BM', E'Bermuda');
INSERT INTO "countries" ("id", "name") VALUES (E'BT', E'Bhutan');
INSERT INTO "countries" ("id", "name") VALUES (E'BO', E'Bolivia');
INSERT INTO "countries" ("id", "name") VALUES (E'BA', E'Bosnia & Herzegovina');
INSERT INTO "countries" ("id", "name") VALUES (E'BW', E'Botswana');
INSERT INTO "countries" ("id", "name") VALUES (E'BR', E'Brazil');
INSERT INTO "countries" ("id", "name") VALUES (E'IO', E'British Indian Ocean Territory');
INSERT INTO "countries" ("id", "name") VALUES (E'VG', E'British Virgin Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'BN', E'Brunei');
INSERT INTO "countries" ("id", "name") VALUES (E'BG', E'Bulgaria');
INSERT INTO "countries" ("id", "name") VALUES (E'BF', E'Burkina Faso');
INSERT INTO "countries" ("id", "name") VALUES (E'BI', E'Burundi');
INSERT INTO "countries" ("id", "name") VALUES (E'KH', E'Cambodia');
INSERT INTO "countries" ("id", "name") VALUES (E'CM', E'Cameroon');
INSERT INTO "countries" ("id", "name") VALUES (E'CA', E'Canada');
INSERT INTO "countries" ("id", "name") VALUES (E'IC', E'Canary Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'CV', E'Cape Verde');
INSERT INTO "countries" ("id", "name") VALUES (E'BQ', E'Caribbean Netherlands');
INSERT INTO "countries" ("id", "name") VALUES (E'KY', E'Cayman Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'CF', E'Central African Republic');
INSERT INTO "countries" ("id", "name") VALUES (E'EA', E'Ceuta & Melilla');
INSERT INTO "countries" ("id", "name") VALUES (E'TD', E'Chad');
INSERT INTO "countries" ("id", "name") VALUES (E'CL', E'Chile');
INSERT INTO "countries" ("id", "name") VALUES (E'CN', E'China');
INSERT INTO "countries" ("id", "name") VALUES (E'CX', E'Christmas Island');
INSERT INTO "countries" ("id", "name") VALUES (E'CC', E'Cocos (Keeling) Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'CO', E'Colombia');
INSERT INTO "countries" ("id", "name") VALUES (E'KM', E'Comoros');
INSERT INTO "countries" ("id", "name") VALUES (E'CG', E'Congo - Brazzaville');
INSERT INTO "countries" ("id", "name") VALUES (E'CD', E'Congo - Kinshasa');
INSERT INTO "countries" ("id", "name") VALUES (E'CK', E'Cook Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'CR', E'Costa Rica');
INSERT INTO "countries" ("id", "name") VALUES (E'CI', E'Côte d’Ivoire');
INSERT INTO "countries" ("id", "name") VALUES (E'HR', E'Croatia');
INSERT INTO "countries" ("id", "name") VALUES (E'CU', E'Cuba');
INSERT INTO "countries" ("id", "name") VALUES (E'CW', E'Curaçao');
INSERT INTO "countries" ("id", "name") VALUES (E'CY', E'Cyprus');
INSERT INTO "countries" ("id", "name") VALUES (E'CZ', E'Czechia');
INSERT INTO "countries" ("id", "name") VALUES (E'DK', E'Denmark');
INSERT INTO "countries" ("id", "name") VALUES (E'DG', E'Diego Garcia');
INSERT INTO "countries" ("id", "name") VALUES (E'DJ', E'Djibouti');
INSERT INTO "countries" ("id", "name") VALUES (E'DM', E'Dominica');
INSERT INTO "countries" ("id", "name") VALUES (E'DO', E'Dominican Republic');
INSERT INTO "countries" ("id", "name") VALUES (E'EC', E'Ecuador');
INSERT INTO "countries" ("id", "name") VALUES (E'EG', E'Egypt');
INSERT INTO "countries" ("id", "name") VALUES (E'SV', E'El Salvador');
INSERT INTO "countries" ("id", "name") VALUES (E'GQ', E'Equatorial Guinea');
INSERT INTO "countries" ("id", "name") VALUES (E'ER', E'Eritrea');
INSERT INTO "countries" ("id", "name") VALUES (E'EE', E'Estonia');
INSERT INTO "countries" ("id", "name") VALUES (E'ET', E'Ethiopia');
INSERT INTO "countries" ("id", "name") VALUES (E'EZ', E'Eurozone');
INSERT INTO "countries" ("id", "name") VALUES (E'FK', E'Falkland Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'FO', E'Faroe Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'FJ', E'Fiji');
INSERT INTO "countries" ("id", "name") VALUES (E'FI', E'Finland');
INSERT INTO "countries" ("id", "name") VALUES (E'FR', E'France');
INSERT INTO "countries" ("id", "name") VALUES (E'GF', E'French Guiana');
INSERT INTO "countries" ("id", "name") VALUES (E'PF', E'French Polynesia');
INSERT INTO "countries" ("id", "name") VALUES (E'TF', E'French Southern Territories');
INSERT INTO "countries" ("id", "name") VALUES (E'GA', E'Gabon');
INSERT INTO "countries" ("id", "name") VALUES (E'GM', E'Gambia');
INSERT INTO "countries" ("id", "name") VALUES (E'GE', E'Georgia');
INSERT INTO "countries" ("id", "name") VALUES (E'DE', E'Germany');
INSERT INTO "countries" ("id", "name") VALUES (E'GH', E'Ghana');
INSERT INTO "countries" ("id", "name") VALUES (E'GI', E'Gibraltar');
INSERT INTO "countries" ("id", "name") VALUES (E'GR', E'Greece');
INSERT INTO "countries" ("id", "name") VALUES (E'GL', E'Greenland');
INSERT INTO "countries" ("id", "name") VALUES (E'GD', E'Grenada');
INSERT INTO "countries" ("id", "name") VALUES (E'GP', E'Guadeloupe');
INSERT INTO "countries" ("id", "name") VALUES (E'GU', E'Guam');
INSERT INTO "countries" ("id", "name") VALUES (E'GT', E'Guatemala');
INSERT INTO "countries" ("id", "name") VALUES (E'GG', E'Guernsey');
INSERT INTO "countries" ("id", "name") VALUES (E'GN', E'Guinea');
INSERT INTO "countries" ("id", "name") VALUES (E'GW', E'Guinea-Bissau');
INSERT INTO "countries" ("id", "name") VALUES (E'GY', E'Guyana');
INSERT INTO "countries" ("id", "name") VALUES (E'HT', E'Haiti');
INSERT INTO "countries" ("id", "name") VALUES (E'HN', E'Honduras');
INSERT INTO "countries" ("id", "name") VALUES (E'HK', E'Hong Kong SAR China');
INSERT INTO "countries" ("id", "name") VALUES (E'HU', E'Hungary');
INSERT INTO "countries" ("id", "name") VALUES (E'IS', E'Iceland');
INSERT INTO "countries" ("id", "name") VALUES (E'IN', E'India');
INSERT INTO "countries" ("id", "name") VALUES (E'ID', E'Indonesia');
INSERT INTO "countries" ("id", "name") VALUES (E'IR', E'Iran');
INSERT INTO "countries" ("id", "name") VALUES (E'IQ', E'Iraq');
INSERT INTO "countries" ("id", "name") VALUES (E'IE', E'Ireland');
INSERT INTO "countries" ("id", "name") VALUES (E'IM', E'Isle of Man');
INSERT INTO "countries" ("id", "name") VALUES (E'IL', E'Israel');
INSERT INTO "countries" ("id", "name") VALUES (E'IT', E'Italy');
INSERT INTO "countries" ("id", "name") VALUES (E'JM', E'Jamaica');
INSERT INTO "countries" ("id", "name") VALUES (E'JP', E'Japan');
INSERT INTO "countries" ("id", "name") VALUES (E'JE', E'Jersey');
INSERT INTO "countries" ("id", "name") VALUES (E'JO', E'Jordan');
INSERT INTO "countries" ("id", "name") VALUES (E'KZ', E'Kazakhstan');
INSERT INTO "countries" ("id", "name") VALUES (E'KE', E'Kenya');
INSERT INTO "countries" ("id", "name") VALUES (E'KI', E'Kiribati');
INSERT INTO "countries" ("id", "name") VALUES (E'XK', E'Kosovo');
INSERT INTO "countries" ("id", "name") VALUES (E'KW', E'Kuwait');
INSERT INTO "countries" ("id", "name") VALUES (E'KG', E'Kyrgyzstan');
INSERT INTO "countries" ("id", "name") VALUES (E'LA', E'Laos');
INSERT INTO "countries" ("id", "name") VALUES (E'LV', E'Latvia');
INSERT INTO "countries" ("id", "name") VALUES (E'LB', E'Lebanon');
INSERT INTO "countries" ("id", "name") VALUES (E'LS', E'Lesotho');
INSERT INTO "countries" ("id", "name") VALUES (E'LR', E'Liberia');
INSERT INTO "countries" ("id", "name") VALUES (E'LY', E'Libya');
INSERT INTO "countries" ("id", "name") VALUES (E'LI', E'Liechtenstein');
INSERT INTO "countries" ("id", "name") VALUES (E'LT', E'Lithuania');
INSERT INTO "countries" ("id", "name") VALUES (E'LU', E'Luxembourg');
INSERT INTO "countries" ("id", "name") VALUES (E'MO', E'Macau SAR China');
INSERT INTO "countries" ("id", "name") VALUES (E'MK', E'Macedonia');
INSERT INTO "countries" ("id", "name") VALUES (E'MG', E'Madagascar');
INSERT INTO "countries" ("id", "name") VALUES (E'MW', E'Malawi');
INSERT INTO "countries" ("id", "name") VALUES (E'MY', E'Malaysia');
INSERT INTO "countries" ("id", "name") VALUES (E'MV', E'Maldives');
INSERT INTO "countries" ("id", "name") VALUES (E'ML', E'Mali');
INSERT INTO "countries" ("id", "name") VALUES (E'MT', E'Malta');
INSERT INTO "countries" ("id", "name") VALUES (E'MH', E'Marshall Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'MQ', E'Martinique');
INSERT INTO "countries" ("id", "name") VALUES (E'MR', E'Mauritania');
INSERT INTO "countries" ("id", "name") VALUES (E'MU', E'Mauritius');
INSERT INTO "countries" ("id", "name") VALUES (E'YT', E'Mayotte');
INSERT INTO "countries" ("id", "name") VALUES (E'MX', E'Mexico');
INSERT INTO "countries" ("id", "name") VALUES (E'FM', E'Micronesia');
INSERT INTO "countries" ("id", "name") VALUES (E'MD', E'Moldova');
INSERT INTO "countries" ("id", "name") VALUES (E'MC', E'Monaco');
INSERT INTO "countries" ("id", "name") VALUES (E'MN', E'Mongolia');
INSERT INTO "countries" ("id", "name") VALUES (E'ME', E'Montenegro');
INSERT INTO "countries" ("id", "name") VALUES (E'MS', E'Montserrat');
INSERT INTO "countries" ("id", "name") VALUES (E'MA', E'Morocco');
INSERT INTO "countries" ("id", "name") VALUES (E'MZ', E'Mozambique');
INSERT INTO "countries" ("id", "name") VALUES (E'MM', E'Myanmar (Burma)');
INSERT INTO "countries" ("id", "name") VALUES (E'NA', E'Namibia');
INSERT INTO "countries" ("id", "name") VALUES (E'NR', E'Nauru');
INSERT INTO "countries" ("id", "name") VALUES (E'NP', E'Nepal');
INSERT INTO "countries" ("id", "name") VALUES (E'NL', E'Netherlands');
INSERT INTO "countries" ("id", "name") VALUES (E'NC', E'New Caledonia');
INSERT INTO "countries" ("id", "name") VALUES (E'NZ', E'New Zealand');
INSERT INTO "countries" ("id", "name") VALUES (E'NI', E'Nicaragua');
INSERT INTO "countries" ("id", "name") VALUES (E'NE', E'Niger');
INSERT INTO "countries" ("id", "name") VALUES (E'NG', E'Nigeria');
INSERT INTO "countries" ("id", "name") VALUES (E'NU', E'Niue');
INSERT INTO "countries" ("id", "name") VALUES (E'NF', E'Norfolk Island');
INSERT INTO "countries" ("id", "name") VALUES (E'KP', E'North Korea');
INSERT INTO "countries" ("id", "name") VALUES (E'MP', E'Northern Mariana Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'NO', E'Norway');
INSERT INTO "countries" ("id", "name") VALUES (E'OM', E'Oman');
INSERT INTO "countries" ("id", "name") VALUES (E'PK', E'Pakistan');
INSERT INTO "countries" ("id", "name") VALUES (E'PW', E'Palau');
INSERT INTO "countries" ("id", "name") VALUES (E'PS', E'Palestinian Territories');
INSERT INTO "countries" ("id", "name") VALUES (E'PA', E'Panama');
INSERT INTO "countries" ("id", "name") VALUES (E'PG', E'Papua New Guinea');
INSERT INTO "countries" ("id", "name") VALUES (E'PY', E'Paraguay');
INSERT INTO "countries" ("id", "name") VALUES (E'PE', E'Peru');
INSERT INTO "countries" ("id", "name") VALUES (E'PH', E'Philippines');
INSERT INTO "countries" ("id", "name") VALUES (E'PN', E'Pitcairn Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'PL', E'Poland');
INSERT INTO "countries" ("id", "name") VALUES (E'PT', E'Portugal');
INSERT INTO "countries" ("id", "name") VALUES (E'PR', E'Puerto Rico');
INSERT INTO "countries" ("id", "name") VALUES (E'QA', E'Qatar');
INSERT INTO "countries" ("id", "name") VALUES (E'RE', E'Réunion');
INSERT INTO "countries" ("id", "name") VALUES (E'RO', E'Romania');
INSERT INTO "countries" ("id", "name") VALUES (E'RU', E'Russia');
INSERT INTO "countries" ("id", "name") VALUES (E'RW', E'Rwanda');
INSERT INTO "countries" ("id", "name") VALUES (E'WS', E'Samoa');
INSERT INTO "countries" ("id", "name") VALUES (E'SM', E'San Marino');
INSERT INTO "countries" ("id", "name") VALUES (E'ST', E'São Tomé & Príncipe');
INSERT INTO "countries" ("id", "name") VALUES (E'SA', E'Saudi Arabia');
INSERT INTO "countries" ("id", "name") VALUES (E'SN', E'Senegal');
INSERT INTO "countries" ("id", "name") VALUES (E'RS', E'Serbia');
INSERT INTO "countries" ("id", "name") VALUES (E'SC', E'Seychelles');
INSERT INTO "countries" ("id", "name") VALUES (E'SL', E'Sierra Leone');
INSERT INTO "countries" ("id", "name") VALUES (E'SG', E'Singapore');
INSERT INTO "countries" ("id", "name") VALUES (E'SX', E'Sint Maarten');
INSERT INTO "countries" ("id", "name") VALUES (E'SK', E'Slovakia');
INSERT INTO "countries" ("id", "name") VALUES (E'SI', E'Slovenia');
INSERT INTO "countries" ("id", "name") VALUES (E'SB', E'Solomon Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'SO', E'Somalia');
INSERT INTO "countries" ("id", "name") VALUES (E'ZA', E'South Africa');
INSERT INTO "countries" ("id", "name") VALUES (E'GS', E'South Georgia & South Sandwich Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'KR', E'South Korea');
INSERT INTO "countries" ("id", "name") VALUES (E'SS', E'South Sudan');
INSERT INTO "countries" ("id", "name") VALUES (E'ES', E'Spain');
INSERT INTO "countries" ("id", "name") VALUES (E'LK', E'Sri Lanka');
INSERT INTO "countries" ("id", "name") VALUES (E'BL', E'St. Barthélemy');
INSERT INTO "countries" ("id", "name") VALUES (E'SH', E'St. Helena');
INSERT INTO "countries" ("id", "name") VALUES (E'KN', E'St. Kitts & Nevis');
INSERT INTO "countries" ("id", "name") VALUES (E'LC', E'St. Lucia');
INSERT INTO "countries" ("id", "name") VALUES (E'MF', E'St. Martin');
INSERT INTO "countries" ("id", "name") VALUES (E'PM', E'St. Pierre & Miquelon');
INSERT INTO "countries" ("id", "name") VALUES (E'VC', E'St. Vincent & Grenadines');
INSERT INTO "countries" ("id", "name") VALUES (E'SD', E'Sudan');
INSERT INTO "countries" ("id", "name") VALUES (E'SR', E'Suriname');
INSERT INTO "countries" ("id", "name") VALUES (E'SJ', E'Svalbard & Jan Mayen');
INSERT INTO "countries" ("id", "name") VALUES (E'SZ', E'Swaziland');
INSERT INTO "countries" ("id", "name") VALUES (E'SE', E'Sweden');
INSERT INTO "countries" ("id", "name") VALUES (E'CH', E'Switzerland');
INSERT INTO "countries" ("id", "name") VALUES (E'SY', E'Syria');
INSERT INTO "countries" ("id", "name") VALUES (E'TW', E'Taiwan');
INSERT INTO "countries" ("id", "name") VALUES (E'TJ', E'Tajikistan');
INSERT INTO "countries" ("id", "name") VALUES (E'TZ', E'Tanzania');
INSERT INTO "countries" ("id", "name") VALUES (E'TH', E'Thailand');
INSERT INTO "countries" ("id", "name") VALUES (E'TL', E'Timor-Leste');
INSERT INTO "countries" ("id", "name") VALUES (E'TG', E'Togo');
INSERT INTO "countries" ("id", "name") VALUES (E'TK', E'Tokelau');
INSERT INTO "countries" ("id", "name") VALUES (E'TO', E'Tonga');
INSERT INTO "countries" ("id", "name") VALUES (E'TT', E'Trinidad & Tobago');
INSERT INTO "countries" ("id", "name") VALUES (E'TA', E'Tristan da Cunha');
INSERT INTO "countries" ("id", "name") VALUES (E'TN', E'Tunisia');
INSERT INTO "countries" ("id", "name") VALUES (E'TR', E'Turkey');
INSERT INTO "countries" ("id", "name") VALUES (E'TM', E'Turkmenistan');
INSERT INTO "countries" ("id", "name") VALUES (E'TC', E'Turks & Caicos Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'TV', E'Tuvalu');
INSERT INTO "countries" ("id", "name") VALUES (E'UM', E'U.S. Outlying Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'VI', E'U.S. Virgin Islands');
INSERT INTO "countries" ("id", "name") VALUES (E'UG', E'Uganda');
INSERT INTO "countries" ("id", "name") VALUES (E'UA', E'Ukraine');
INSERT INTO "countries" ("id", "name") VALUES (E'AE', E'United Arab Emirates');
INSERT INTO "countries" ("id", "name") VALUES (E'GB', E'United Kingdom');
INSERT INTO "countries" ("id", "name") VALUES (E'UN', E'United Nations');
INSERT INTO "countries" ("id", "name") VALUES (E'US', E'United States');
INSERT INTO "countries" ("id", "name") VALUES (E'UY', E'Uruguay');
INSERT INTO "countries" ("id", "name") VALUES (E'UZ', E'Uzbekistan');
INSERT INTO "countries" ("id", "name") VALUES (E'VU', E'Vanuatu');
INSERT INTO "countries" ("id", "name") VALUES (E'VA', E'Vatican City');
INSERT INTO "countries" ("id", "name") VALUES (E'VE', E'Venezuela');
INSERT INTO "countries" ("id", "name") VALUES (E'VN', E'Vietnam');
INSERT INTO "countries" ("id", "name") VALUES (E'WF', E'Wallis & Futuna');
INSERT INTO "countries" ("id", "name") VALUES (E'EH', E'Western Sahara');
INSERT INTO "countries" ("id", "name") VALUES (E'YE', E'Yemen');
INSERT INTO "countries" ("id", "name") VALUES (E'ZM', E'Zambia');
INSERT INTO "countries" ("id", "name") VALUES (E'ZW', E'Zimbabwe');

--
-- Plans table
--

CREATE TABLE plans (
    id int PRIMARY KEY,
    name varchar(10) NOT NULL,
    price numeric(10, 2) NOT NULL 
);
INSERT INTO plans (id, name, price) VALUES 
(1, 'BT-100', 100.00),
(2, 'BT-500', 500.00),
(3, 'BT-1000', 1000.00),
(4, 'BT-2500', 2500.00),
(5, 'BT-5000', 5000.00),
(6, 'BT-12500', 12500.00),
(7, 'BT-25000', 25000.00),
(8, 'BT-50000', 50000.00);

--
-- Users table
--

CREATE TYPE user_role AS ENUM('user', 'leader', 'admin');
CREATE TYPE binary_side AS ENUM('left', 'right');
CREATE TABLE users (
    id bigserial PRIMARY KEY,
    parent_id bigint REFERENCES users(id),
    left_id bigint REFERENCES users(id) UNIQUE,
    right_id bigint REFERENCES users(id) UNIQUE,
    previous_id bigint REFERENCES users(id),
    plan_id int REFERENCES plans(id),
    balance numeric(16, 2) NOT NULL DEFAULT 0.00,
    network_balance numeric(16, 2) NOT NULL DEFAULT 0.00,
    total_profit numeric(16, 2) NOT NULL DEFAULT 0.00,
    career_points bigint NOT NULL DEFAULT 0,
    career_plan int,
    total_points_left bigint NOT NULL DEFAULT 0,
    total_points_right bigint NOT NULL DEFAULT 0,
    total_users_left bigint NOT NULL DEFAULT 0,
    total_users_right bigint NOT NULL DEFAULT 0,
    qualified boolean DEFAULT FALSE,
    qualified_left boolean DEFAULT FALSE,
    qualified_right boolean DEFAULT FALSE,
    renewed boolean DEFAULT FALSE,
    binary_side binary_side NOT NULL DEFAULT 'left',
    total_plan_cycle decimal(16, 2) NOT NULL DEFAULT 0.00,
    role user_role DEFAULT 'user',
    btc_address varchar(50),
    country_id varchar(10) NOT NULL REFERENCES countries(id),
    invite_hash varchar(20) NOT NULL UNIQUE,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    username varchar(30) NOT NULL UNIQUE,
    password_hash text,
    otp_enabled boolean DEFAULT FALSE,
    otp_key varchar(30),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ADD CONSTRAINT check_id_parent_id CHECK (id <> parent_id);
ALTER TABLE users ADD CONSTRAINT check_id_left_id CHECK (id <> left_id);
ALTER TABLE users ADD CONSTRAINT check_id_right_id CHECK (id <> right_id);
ALTER TABLE users ADD CONSTRAINT check_left_id_right_id CHECK (left_id <> right_id);

--
-- Invoices table
--

CREATE TYPE invoice_status AS ENUM('waiting_payment', 'payment_confirmed', 'plan_cycle_completed', 'waiting_confirmations', 'expired');
CREATE TABLE invoices (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    plan_id int NOT NULL REFERENCES plans(id),
    btc_price numeric(16, 8) NOT NULL,
    price numeric(16, 8) NOT NULL,
    btc_address varchar(50) NOT NULL,
    tx_id varchar(100),
    status invoice_status NOT NULL DEFAULT 'waiting_payment',
    upgrade_from_plan_id int REFERENCES plans(id),
    is_upgrade boolean NOT NULL DEFAULT FALSE,
    blockio_notification_id varchar(50) NOT NULL,
    paid_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Unilevel transactions table
--

CREATE TABLE unilevel_transactions (
    id bigserial PRIMARY KEY,
    from_user_id bigint NOT NULL REFERENCES users(id),
    to_user_id bigint NOT NULL REFERENCES users(id),
    plan_id bigint NOT NULL REFERENCES plans(id),
    amount_paid numeric(16, 2) NOT NULL,
    level int NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Binary transactions table
--

CREATE TABLE binary_transactions (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    amount_paid numeric(16, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Unilevel transactions table
--

CREATE TABLE unilevel_transactions (
    id bigserial PRIMARY KEY,
    from_user_id bigint NOT NULL REFERENCES users(id),
    to_user_id bigint NOT NULL REFERENCES users(id),
    plan_id bigint NOT NULL REFERENCES plans(id),
    amount_paid numeric(16, 2) NOT NULL,
    level int NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Robot transactions table
--

CREATE TABLE robot_transactions (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    plan_id bigint NOT NULL REFERENCES plans(id),
    percentage numeric(3, 2) NOT NULL,
    amount_paid numeric(16, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Robot transactions table
--

CREATE TABLE residual_transactions (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    plan_id bigint NOT NULL REFERENCES plans(id),
    percentage numeric(3, 2) NOT NULL,
    amount_paid numeric(16, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Payment transactions table
--

CREATE TYPE balance_type AS ENUM('network_balance', 'balance');
CREATE TABLE payment_transactions (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    invoice_id bigint NOT NULL REFERENCES invoices(id),
    balance_type balance_type NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);


--
-- Withdraw transactions table
--

CREATE TYPE withdraw_type AS ENUM('network_balance', 'balance');
CREATE TABLE withdraw_transactions (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    withdraw_type withdraw_type NOT NULL,
    amount numeric(16, 2) NOT NULL,
    btc_address varchar(50) NOT NULL,
    paid boolean NOT NULL DEFAULT FALSE,
    tx_id varchar(100),
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Withdraw transactions table
--

CREATE TABLE career_transactions (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    prize numeric(16, 2) NOT NULL,
    points_needed bigint NOT NULL,
    points bigint NOT NULL,
    career_plan int NOT NULL,
    paid boolean NOT NULL DEFAULT FALSE,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- PINS table
--

CREATE TABLE pins (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    pin varchar(6),
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- blockio_notifications table
--

CREATE TABLE blockio_notifications (
    id bigserial PRIMARY KEY,
    notification_id varchar(50) NOT NULL,
    delivery_attempt int NOT NULL,
    btc_address varchar(50) NOT NULL,
    btc_balance_change numeric(16, 8) NOT NULL,
    btc_amount_sent numeric(16, 8) NOT NULL,
    btc_amount_received numeric(16, 8) NOT NULL,
    tx_id varchar(100) NOT NULL,
    confirmations int NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Notifications table
--

CREATE TABLE notifications (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    read boolean NOT NULL DEFAULT FALSE 
);
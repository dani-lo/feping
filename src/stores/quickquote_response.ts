
export const quickQuoteResponse = {
    "main_policy_holder": {
        "first_name": "John",
        "surname": "Doe",
        "email": "dummy.email@mail.com",
        "date_of_birth": "1999-03-12T00:00:00",
        "gender": null,
        "title": null,
        "id": 4,
        "address": {
          "street": "Annandale Rd",
          "town": "London",
          "postcode": "SE10 0DE",
          "region": "GREATER_LONDON",
          "premise_number": "45",
          "building_name": null,
          "flat_number": null,
          "county": "GREATER_LONDON",
          "country": "United Kingdom",
          "acloud_id": null,
          "description": "45 Annandale Rd, London SE10 0DE"
        },
        "day_telephone": null,
        "evening_telephone": null,
        "applicant_details": null,
        "occupation": "GAMBLER",
        "resident": true,
        "claims": false
    },
    "joint_policy_holder": {
      "first_name": null,
      "surname": null,
      "email": null,
      "date_of_birth": "1999-03-12T00:00:00",
      "gender": "Unknown",
      "title": null,
    },
    'home_residents': {
      'adults': 0,
      'children': 0,
    },
    "building": {
      "building_type": "TOWN_HOUSE",
      "building_age": 10,
      "rooms": 3,
      "construction": "CONCRETE"
    },
    "ownership_values": {
      "ownership_type": "MORTGAGED",
      "rebuild_cost": "300000",
      "market_value": "500000"
    },
    "risks": {
        "risk_water": true,
        "flooded": true,
        "grond_movement": true,
        "underpinned": true,
        "cracks": true,
        "building_work": true,
        "for_business": true,
        "previous_claims": []
    },
    "property": {
      "address": {
        "street": "Annandale Rd",
        "town": "London",
        "postcode": "SE10 0DE",
        "region": "Greater London",
        "premise_number": "45",
        "building_name": null,
        "flat_number": null,
        "county": "London",
        "country": "United Kingdom",
        "acloud_id": "8e194ad23969357:rvtMK6",
        "description": "45 Annandale Rd, London SE10 0DE"
      },
      "market_value": 250000,
      "rebuild_cost": 200000,
      "year_built": 1985,
      "type": "House",
      "subtype": "Semi-Detached House",
      "smoke_alarms": 1,
      "location": {
        "latitude": 51.4840123,
        "longitude": 0.0105914
      },
      "acloud_id": "8e194ad23969357:rvtMK6",
      "estimated_rebuild_cost": null,
      "burglar_alarm": null,
      "occupancy": null,
      "room_info": null,
      "id": 6
    },
    "policy": {
      "start_date": "2024-01-01",
      "end_date": "2024-12-31",
      "payment_frequency": "Annually",
      "enquiry_date": "2024-03-28",
      "buildings_coverage": {
        "type": "Buildings",
        "voluntary_excess": 250,
        "has_accidental_damage_cover": false,
        "has_home_emergency_cover": false,
        "has_legal_expenses_cover": false,
        "market_value": 660000,
        "rebuild_cost": 660000
      },
      "contents_coverage": {
        "type": "Contents",
        "voluntary_excess": 250,
        "has_accidental_damage_cover": false,
        "has_home_emergency_cover": false,
        "has_legal_expenses_cover": false,
        "total_contents": null,
        "total_valuables_inside": null,
        "total_valuables_outside": null,
        "specified_high_risk_items": []
      },
      
      "voluntary_excess": 0,
      "purchase_date": "2024-01-01T00:00:00"
    },
    "features": {
      "policy_type": "flex",
      "flex": {
        "contents_cover": {
          "value": 200,
          "options": [200, 300, 500, 800],
        },
        "buildings_cover": {
          "value": 100,
          "options": [100, 200, 400, 600],
        },
        "home_emergency": {
          "value": 50,
          "options": [50, 100, 200, 400],
        },
        "alternative_accomodation": {
          "value": null,
          "options":  [5, 10, 20, 60],
        },
        "legal_fees": {
          "value": null,
          "options": [200, 300, 500, 800],
        },
        "building_accidental_damage": {
          "value": null,
          "options": [350, 600, 900, 1200],
        },
        "contents_accidental_damage": {
          "value": null,
          "options": [200, 300, 500, 800],
        }
      },
      "premium": {
        "contents_cover_premium": 300,
        "buildings_cover_premium": 440,
        "home_emergency_premium": 60,
        "alternative_accomodation_premium": 600,
        "legal_fees_premium": 190,
        "building_accidental_damage_premium": 450,
        "contents_accidental_damage_premium": 780
      },
      "building_voluntary_excess": null,
      "contents_voluntary_excess": null
    },
    "quote": {
      "enquiry_date": "2024-03-28",
      "quote_uid": "b802a441-6cd2-49e7-9c0d-d8d12228f295",
      "declined": false,
      "expiry_date": "2024-04-27",
      "offers": [
        {
          "premium": 523.3862,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 0,
          "buildings_ad_cover": "No ad cover",
          "contents_ad_cover": "No ad cover",
          "uid": "f7c6e2b3-c936-49e4-8ced-5ee422f23329",
          "id": 217
        },
        {
          "premium": 534.6065,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 11.2204,
          "buildings_ad_cover": "No ad cover",
          "contents_ad_cover": "Limited ad cover",
          "uid": "fb45f8fc-2f5a-425d-8fa9-0759bc993483",
          "id": 218
        },
        {
          "premium": 579.488,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 56.1018,
          "buildings_ad_cover": "No ad cover",
          "contents_ad_cover": "Full ad cover",
          "uid": "61c75f0b-e4e6-48e9-a7f3-87fd925bb933",
          "id": 219
        },
        {
          "premium": 539.0205,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 15.6343,
          "buildings_ad_cover": "Limited ad cover",
          "contents_ad_cover": "No ad cover",
          "uid": "e7e07768-00e6-4963-bcec-6242a578ec5c",
          "id": 220
        },
        {
          "premium": 552.4889,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 29.1027,
          "buildings_ad_cover": "Limited ad cover",
          "contents_ad_cover": "Limited ad cover",
          "uid": "9389d80a-86b8-4535-a346-04ddcaa3aac0",
          "id": 221
        },
        {
          "premium": 595.1223,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 71.7361,
          "buildings_ad_cover": "Limited ad cover",
          "contents_ad_cover": "Full ad cover",
          "uid": "fff2e1e8-294c-4564-b46a-114495439435",
          "id": 222
        },
        {
          "premium": 601.5578,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 78.1716,
          "buildings_ad_cover": "Full ad cover",
          "contents_ad_cover": "No ad cover",
          "uid": "ad4bcd2c-13a7-4889-8beb-f5dd19a3f8dd",
          "id": 223
        },
        {
          "premium": 612.7781,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 89.3919,
          "buildings_ad_cover": "Full ad cover",
          "contents_ad_cover": "Limited ad cover",
          "uid": "c3149bf9-f228-48f4-8876-ee6a0a813020",
          "id": 224
        },
        {
          "premium": 668.8996,
          "product_id": 1,
          "addons_external_he": 59.99,
          "addons_external_le": 39.99,
          "internal_ad_cover": 145.5134,
          "buildings_ad_cover": "Full ad cover",
          "contents_ad_cover": "Full ad cover",
          "uid": "2d225712-8f72-4ebb-8abd-d2e3d49ab73e",
          "id": 225
        }
      ]
    }
  }
  
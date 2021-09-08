# MASSIVE STOCK UPDATE
Massive inventory stock update service through SKU and warehouseId

##### `PUT `

```https://{environment}--{accountName}.myvtex.com/_v/massive/stock/update```

 
### Headers

- Required
  - Accept : application/json
  - Content-Type : application/json; charset=utf-8

### Path params

- Required
  - sku [int32] 
  - warehouseId [int32] || [string]
  - quantity [int32]
  - unlimitedQuantity [boolean]
  - dateUtcOnBalanceSystem [string]
   
>   Read the API information for more information [link](https://developers.vtex.com/vtex-rest-api/reference/inventory#updateinventorybyskuandwarehouse)

### Request body example

```json
[
   {
      "sku":1,
      "warehouseId":123,
      "quantity":50,
      "unlimitedQuantity":false,
      "dateUtcOnBalanceSystem": null
   }
]
     
```
      
### Success Response body example

```json
{
   "successfulResponses":
      {
         "elements": [  {
                "sku": 1,
                "success": true,
                "warehouseId": 123,
                "quantity": 50,
                "unlimitedQuantity": false,
                "dateUtcOnBalanceSystem": null
            }],
         "quantity": 1,
      }
   ,
   "failedResponses": {
        "elements": [],
        "quantity": 0
    },
    "total": 1
}
```

### Error Response body example

```json
{
    "failedResponses": {
        "elements": [
            [
                {
                    "sku": 159076,
                    "quantity": 12,
                    "dateUtcOnBalanceSystem": null,
                    "success": "false",
                    "error": 400,
                    "errorMessage": "The request is invalid: The 'warehouseId' field is required."
                }
            ]
        ],
        "quantity": 1
    }
}
```

## Flow

![Massive stock update flow](https://user-images.githubusercontent.com/33711188/131016404-cbeaf737-bc90-4faa-b0be-2b89bef6756d.png)


## Contributors ✨

Thanks goes to these wonderful people:

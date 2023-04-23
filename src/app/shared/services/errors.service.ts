import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  getErrors(): any {
    return {
      SignUpErrors: {
        Name: {
          Required: _reqErr("Name"),
          MinLength: _lenErrAtLeast("Name", 3)
        },
        Email: {
          Required: _reqErr("Email"),
          MinLength: _lenErrAtLeast("Email", 8),
          Pattern: _invalidErr("Email")
        },
        PhoneNumber: {
          Required: _reqErr("Phone Number"),
          Length: _lenErrEqual("Phone Number", 11),  //used for minLength and maxLength,
          Pattern: _invalidErr("Phone Number")
        },
        Password: {
          Required: _reqErr("Password"),
          MinLength: _lenErrAtLeast("Password", 8),
          Pattern: _passErr()
        },
        UserType: {
          Required: _reqErr("User Type"),
        }
      },
      LoginErrors: {
        Email: {
          Required: _reqErr("Email"),
          MinLength: _lenErrAtLeast("Email", 8),
          Pattern: _invalidErr("Email")
        },
        Password: {
          Required: _reqErr("Password"),
          MinLength: _lenErrAtLeast("Password", 8),
          Pattern: _passErr()
        }
      },
      AddOfferErrors: {
        OfferName: {
          Required: _reqErr("Offer Name"),
          MinLength: _lenErrAtLeast("Offer Name", 3),
        },
        Password: {
          Required: _reqErr("Password"),
          MinLength: _lenErrAtLeast("Password", 8),
          Pattern: _passErr()
        },
        OfferStatus: {
          Required: "Please select an option."
        },
        InternetQuantityOrPrice: {
          Required: _reqErr("Internet field"),
          Pattern: _invalidErr("Number")
        },
        MinutesQuantityOrPrice: {
          Required: _reqErr("Minutes field"),
          Pattern: _invalidErr("Number")
        },
        Price: {
          Required: _reqErr("Price field"),
          Pattern: _invalidErr("Number")
        }
      },
      EditProfileInfoErrors: {
        Name: {
          Required: _reqErr("Name"),
          MinLength: _lenErrAtLeast("Name", 3)
        },
        PhoneNumber: {
          Required: _reqErr("Phone Number"),
          Length: _lenErrEqual("Phone Number", 11),  //used for minLength and maxLength,
          Pattern: _invalidErr("Phone Number")
        },
        Password: {
          Required: _reqErr("Password"),
          MinLength: _lenErrAtLeast("Password", 8),
          Pattern: _passErr()
        },
        Street: {
          MinLength: _lenErrAtLeast("Street", 3),
        },
        BuildingNum: {
          Pattern: _invalidErr("Number")
        },
        City: {
          MinLength: _lenErrAtLeast("City", 3),
        },
        Country: {
          MinLength: _lenErrAtLeast("Country", 3),
        }
      },
      AddBillErrors: {
        Email: {
          Required: _reqErr("Email"),
          MinLength: _lenErrAtLeast("Email", 8),
          Pattern: _invalidErr("Email")
        },
        Month: {
          Required: _reqErr("Month"),
          Pattern: _invalidErr("Month")
        },
        Year: {
          Required: _reqErr("Year"),
          Pattern: _invalidErr("Year")
        },
        Category: {
          Required: _reqErr("Category"),
        },
        Penalty: {
          Required: _reqErr("Penalty"),
          Pattern: _invalidErr("Penalty")
        },
        Units: {
          Required: _reqErr("Units"),
          Pattern: _invalidErr("Units")
        },
        Total: {
          Required: _reqErr("Total"),
          Pattern: _invalidErr("Total")
        },
        ServProv_offerName: {
          Required: _reqErr("Service Provider / Offer Name")
        }
      },
      PayWithCardErrors: {
        CardNumber: {
          Required: _reqErr("Card Number"),
          MinLength: _lenErrAtLeast("Card Number", 16),
          MaxLength: _lenErrAtMost("Card Number", 19),
          Pattern: _invalidErr("Card Number")
        },
        CVV: {
          Required: _reqErr("CVV"),
          MinLength: _lenErrAtLeast("CVV", 3),
          MaxLength: _lenErrAtMost("CVV", 3),
          Pattern: _invalidErr("CVV")
        },
        ExpMonth: {
          Required: _reqErr("Expiry Month"),
          Pattern: _invalidErr("Expiry Month")
        },
        ExpYear: {
          Required: _reqErr("Expiry Year"),
          Pattern: _invalidErr("Expiry Year")
        },
      },
      AdminManageErrors: {
        ElectricityUnit: {
          Required: _reqErr("Electricity Unit"),
          Pattern: _invalidErr("Electricity Unit")
        },
        WaterUnit: {
          Required: _reqErr("Water Unit"),
          Pattern: _invalidErr("Water Unit")

        }
      }
    }
  }
}
function _reqErr(fieldName: string): string {
  return `${fieldName} is required.`
}
function _lenErrEqual(fieldName: string, len: number): string {
  return `${fieldName} must be ${len} digits long.`
}
function _lenErrAtLeast(fieldName: string, len: number): string {
  return `${fieldName} must be at least ${len} characters long.`
}
function _lenErrAtMost(fieldName: string, len: number): string {
  return `${fieldName} must be at most ${len} characters long.`
}
function _invalidErr(fieldName: string): string {
  return `${fieldName} is invalid.`
}
function _passErr(): string {
  return "Password must contain at least one uppercase and one lowercase letter."
}
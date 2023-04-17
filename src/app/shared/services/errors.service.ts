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
          Pattern: "Password must contain at least one uppercase and one lowercase letter."
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
          Pattern: "Password must contain at least one uppercase and one lowercase letter."
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
          Pattern: "Password must contain at least one uppercase and one lowercase letter."
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
function _invalidErr(fieldName: string): string {
  return `${fieldName} is invalid.`
}
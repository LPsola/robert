import {AuditedClass} from './audited-class'

export abstract class DomainClass extends AuditedClass {
    id: string

    protected constructor(domainClass?: Partial<DomainClass>) {
        super(domainClass!)
        if (domainClass) {
            this.id = domainClass.id!
        }
    }
}

export abstract class AuditedClass {
    /**
     * Id of the person who has created this object
     */
    createdBy: string

    /**
     * Date of creation of this object
     */
    createdDate: string

    /**
     * Id of the person who has last updated this object
     */
    lastModifiedBy: string

    /**
     * Date of last modification of this object
     */
    lastModifiedDate: string

    /**
     * Date at which the entity in the store was fetched from the backend
     * Front only data
     */
    fetchedDate: string

    protected constructor(audited: Partial<AuditedClass>) {
        if (audited) {
            this.createdBy = audited.createdBy!
            this.createdDate = audited.createdDate!
            this.lastModifiedBy = audited.lastModifiedBy!
            this.lastModifiedDate = audited.lastModifiedDate!
            this.fetchedDate = audited.fetchedDate!
        }
    }
}

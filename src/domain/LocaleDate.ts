export class LocaleDate {

	private constructor(private date: Date) {}

	static create() {
		return new LocaleDate(new Date());
	}

	static of(date: Date) {
		return new LocaleDate(date);
	}

	format(): string {
		return this.date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' });
	}
}